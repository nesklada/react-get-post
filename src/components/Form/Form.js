import { useCallback, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { motion } from 'framer-motion';

import { API_POSITIONS, API_TOKEN, API_USERS } from 'api/config';
import { emailRegex } from 'api/validation';
import { usersActionsContext } from 'context/UsersContext';
import response from 'api/response';
import useFetch from 'hooks/useFetch';

import Button, { scrollToID } from "components/Button/Button";
import UploadField from "components/UploadField/UploadField";
import Loader from 'components/Loader/Loader';
import SectionHeader from 'components/Section/SectionHeader';
import {MotionHeading} from 'components/Heading/Heading';
import MUICustomTheme from "components/MUICustomTheme/MUICustomTheme";
import FormSubmited from './FormSubmited';
import { postSectionID } from 'layout/PostSection/PostSection';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

import motionOnView from 'ui/motion';

import styles from "./Form.module.scss";
import stylesGrid from "scss/grid.module.scss";
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const { dFlex, flexColumn, alignItemsCenter } = stylesGrid;
const requiredMessage = 'This field is required.';
const phoneMask = "+380 (99) 999-99-99";
const enterMessage = 'Please enter a valid';

export default function Form() {
    const [submited, setSubmited] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [options] = useFetch(API_POSITIONS);
    const updateUsers = useContext(usersActionsContext);

    const positions = options?.positions;

    const { register, formState: { errors, isValid }, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        setSubmiting(true);

        const token = await response(API_TOKEN)
            .then(data => {
                if (!data?.success) return

                return data.token
            })
            .catch(() => {
                setSubmiting(false);
            });

        if (!token) {
            setSubmiting(false);

            return
        }

        response(API_USERS, {
            method: 'POST',
            body: consistData(data),
            headers: {
                'Token': token
            }
        }).then((data) => {
            if(!data?.success) return
            setSubmited(true);

            updateUsers({
                page: 1
            });

            scrollToID(postSectionID);
        })
        .finally(() => setSubmiting(false));
    }, [updateUsers]);

    return (
        <>
            <SectionHeader>
                <MotionHeading 
                    type={1}
                    {...motionOnView}>
                    {submited ?
                        'User successfully registered' :
                        'Working with POST request'}
                </MotionHeading>
            </SectionHeader>

            {submited ?
                    <FormSubmited /> :
                <MUICustomTheme>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        {(submiting || !positions) &&
                            <Loader fullSize={true} />
                        }
                        <motion.div className={styles.formGroup} {...motionOnView}>
                            <TextField label="Your Name"
                                fullWidth
                                variant="outlined"
                                {...register('name', {
                                    required: requiredMessage,
                                    minLength: { value: 3, message: `${enterMessage} name.` },
                                    maxLength: { value: 60, message: `${enterMessage} name.` }
                                })}
                                error={!!errors.name}
                                helperText={<ErrorMessage>{errors.name?.message}</ErrorMessage>} />
                        </motion.div>

                        <motion.div className={styles.formGroup} {...motionOnView}>
                            <TextField label="Email"
                                fullWidth
                                variant="outlined"
                                type="email"
                                {...register('email', {
                                    required: requiredMessage,
                                    pattern: {
                                        value: emailRegex,
                                        message: `${enterMessage} email.`
                                    }
                                })}
                                error={!!errors.email}
                                helperText={<ErrorMessage>{errors.email?.message}</ErrorMessage>} />
                        </motion.div>

                        <motion.div className={styles.formGroup} {...motionOnView}>
                            <InputMask mask={phoneMask}
                                {...register('phone', {
                                    required: requiredMessage,
                                    validate: (val) => val.replace(/\D/g, '').length === 12 || `${enterMessage} phone number.`
                                })}
                                error={!!errors.phone}
                                helperText={<ErrorMessage>{errors.phone?.message}</ErrorMessage>}>
                                {(inputProps) => (
                                    <TextField label="Phone"
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        {...inputProps}>

                                    </TextField>
                                )}
                            </InputMask>
                            <FormHelperText variant='outlined'>
                                {phoneMask.replaceAll('9', 'X')}
                            </FormHelperText>
                        </motion.div>

                        <motion.div className={styles.formGroup} {...motionOnView}>
                            {positions &&
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
                                                    <ErrorMessage>
                                                        {errors.position?.message}
                                                    </ErrorMessage>
                                            </FormHelperText>}

                                    </RadioGroup>
                                </>
                            }
                        </motion.div>

                        <motion.div className={styles.formGroup} {...motionOnView}>
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
                                    <ErrorMessage>
                                        {errors.photo?.message}
                                    </ErrorMessage>
                                </FormHelperText>}
                        </motion.div>

                        <motion.div 
                            className={`${dFlex} ${flexColumn} ${alignItemsCenter}`}
                            {...motionOnView}>
                            <div>
                                <Button disabledClass={!isValid} disabled={submiting} type="submit">Sign up</Button>
                            </div>
                        </motion.div>
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