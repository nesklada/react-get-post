import { useCallback, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { API_POSITIONS, API_TOKEN, API_USERS } from 'api/config';
import { emailRegex } from 'api/validation';
import { usersHandleContext } from 'context/UserContext';
import response from 'api/response';
import useFetch from 'hooks/useFetch';

import InputMask from 'react-input-mask';
import Button, { scrollToID } from "components/Button/Button";
import UploadField from "components/UploadField/UploadField";
import Loader from 'components/Loader/Loader';
import SectionHeader from 'components/Section/SectionHeader';
import Heading from 'components/Heading/Heading';
import MUICustomTheme from "components/MUICustomTheme/MUICustomTheme";
import FormSubmited from './FormSubmited';
import { postSectionID } from 'layout/PostSection/PostSection';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

import styles from "./Form.module.scss";
import stylesGrid from "scss/grid.module.scss";

const { dFlex, flexColumn, alignItemsCenter } = stylesGrid;
const requiredMessage = 'This field is required.';
const phoneMask = "+380 (99) 999-99-99";
const enterMessage = 'Please enter a valid';

export default function Form({ onSubmited }) {
    const [submited, setSubmited] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const [options, fetchingOptions] = useFetch(API_POSITIONS);

    const updateUsers = useContext(usersHandleContext)

    const { register, formState: { errors, isValid }, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        setSubmiting(true);

        const token = await response(API_TOKEN)
            .then(data => {
                if (!data.success) return

                return data.token
            })
            .catch(() => {
                setSubmiting(false);
            });

        if(!token) {
            return
        }

        response(API_USERS, {
            method: 'POST',
            body: consistData(data),
            headers: {
                'Token': token
            }
        }).then((data) => {
            if(!data.success) return

            setSubmited(true);

            updateUsers({
                page: 1
            });

            scrollToID(postSectionID);
        }).finally(() => setSubmiting(false));
    }, [updateUsers]);

    return (
        <>
            <SectionHeader>
                <Heading type={1}>
                    {submited ?
                        'User successfully registered' :
                        'Working with POST request'}
                </Heading>
            </SectionHeader>

            {submited ? <FormSubmited /> :
                <MUICustomTheme>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        {(fetchingOptions || submiting) &&
                            <Loader fullSize={true} />
                        }
                        <div className={styles.formGroup}>
                            <TextField label="Your Name"
                                fullWidth
                                variant="outlined"
                                {...register('name', {
                                    required: requiredMessage,
                                    minLength: { value: 3, message: `${enterMessage} name.` },
                                    maxLength: { value: 60, message: `${enterMessage} name.` }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message} />
                        </div>

                        <div className={styles.formGroup}>
                            <TextField label="Email"
                                fullWidth
                                variant="outlined"
                                {...register('email', {
                                    required: requiredMessage,
                                    pattern: {
                                        value: emailRegex,
                                        message: `${enterMessage} email.`
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message} />
                        </div>

                        <div className={styles.formGroup}>
                            <InputMask mask={phoneMask}
                                {...register('phone', {
                                    required: requiredMessage,
                                    validate: (val) => val.replace(/\D/g, '').length === 12 || `${enterMessage} phone number.`
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}>
                                {(inputProps) => (
                                    <TextField label="Phone"
                                        fullWidth
                                        variant="outlined"
                                        {...inputProps}>

                                    </TextField>
                                )}
                            </InputMask>
                            <FormHelperText variant='outlined'>
                                {phoneMask.replaceAll('9', 'X')}
                            </FormHelperText>
                        </div>

                        <div className={styles.formGroup}>
                            {options?.positions?.length &&
                                <>
                                    <FormLabel>Select your position</FormLabel>
                                    <RadioGroup
                                        name="radio-buttons-group"
                                        disabled={true}
                                    >
                                        {options.positions.map(position => {
                                            return (<FormControlLabel key={`radio-${position.id}`}
                                                value={position.id}
                                                control={<Radio />}
                                                label={position.name}
                                                {...register('position', { required: 'Please select one of the options above.' })}
                                            />)
                                        })}

                                        {!!errors?.position &&
                                            <FormHelperText error={true}
                                                variant='outlined'>
                                                {errors.position?.message}
                                            </FormHelperText>}

                                    </RadioGroup>
                                </>
                            }
                        </div>

                        <div className={styles.formGroup}>
                            <UploadField
                                placeholder='Upload your photo'
                                {...register('photo', {
                                    required: 'Please attach your photo',
                                    validate: {
                                        photoType: value => validatePhoto(value, 5000),
                                        asyncValidatePhoto: asyncValidatePhoto
                                    }
                                })}
                                error={!!errors.photo}
                            />

                            {!!errors?.photo &&
                                <FormHelperText error={true} variant='outlined'>
                                    {errors.photo?.message}
                                </FormHelperText>}
                        </div>

                        <div className={`${dFlex} ${flexColumn} ${alignItemsCenter}`}>
                            <div>
                                <Button disabledClass={!isValid} disabled={submiting} type="submit">Sign up</Button>
                            </div>
                        </div>
                    </form>
                </MUICustomTheme>
            }
        </>
    )
}

function validatePhoto(fileList, fileSizeInKylobyte) {
    const files = Array.prototype.slice.call(fileList);
    const validExts = ['jpeg', 'jpg'];
    const prefixExt = 'image/';

    let message = `Available extensions: ${validExts.join('/')}.`;
    let isValidExtension = false;
    let isFilesize = false;
    let sizeInMB = fileSizeInKylobyte >= 1000;

    return files.every(file => {
        isValidExtension = validExts.some(ext => (prefixExt + ext) === file.type);

        if (!isValidExtension) {
            return isValidExtension;
        }

        isFilesize = (file.size / 1000) <= fileSizeInKylobyte;


        if (!isFilesize) {
            message = `File size limit ${fileSizeInKylobyte / (sizeInMB ? 1000 : 1)}${sizeInMB ? 'mb' : 'kb'}.`;

            return isFilesize;
        }

        return true;
    }) || message;
}

async function asyncValidatePhoto(fileList) {
    const files = Array.prototype.slice.call(fileList);
    const width = 70;
    const height = 70;

    const promises = Promise.all(files.map((file) => getPhotoWidthHeight(file)));
    const images = await promises;

    let isDamaged = false;

    return images.every(img => {

        if (img === 404) {
            isDamaged = true;

            return false
        }

        return img.width >= width && img.height >= height
    }) || (
            isDamaged ?
                'The file is corrupted.' :
                `Minimum size of photo: ${width}x${height}px.`
        );
}

function getPhotoWidthHeight(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => resolve({
            height: img.height,
            width: img.width
        });

        img.onerror = () => resolve(404)
        img.src = url
    });
}

function consistData(data) {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', `+${data.phone.replace(/\D/g, '')}`);
    formData.append('position_id', +data.position);
    formData.append('photo', data.photo[0]);

    return formData;
}