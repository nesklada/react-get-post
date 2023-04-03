import React, { useState } from 'react';
import styles from './UploadField.module.scss';

export default React.forwardRef(({ onChange, onBlur, name, placeholder, error, multiple }, ref) => {
    const [filename, setFilename] = useState('');

    return (
        <label className={`${styles.upload} ${error ? styles.isError : ''}`}>
            <input className={styles.uploadField}
                type="file"
                multiple={multiple || false}
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e);
                    }

                    const ListFiles = e.target.files;

                    if (!ListFiles.length) {
                        return
                    }

                    const files = Array.prototype.slice.call(ListFiles);
                    setFilename(files.map((file, i) => file.name + (i + 1 !== files.length ? '; ' : '')))
                }} />

            <div className={styles.uploadHolder}>
                <div className={styles.uploadLabel}>
                    Upload
                </div>
                <div className={`${styles.uploadPlaceholder} ${filename ? styles.isActive : ''}`}>
                    {filename || placeholder}
                </div>
            </div>
        </label>
    )
})

