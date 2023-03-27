import { useState } from 'react';
import styles from './Card.module.scss';

export default function Card({
    photo, 
    name, 
    email,
    position,
    phone
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className={styles.card}>
            <div className={`${styles.cardPhoto} ${styles.cardRow} ${imageError ? styles.cardPhotoLetter : ''}`}>
                <img src={photo} alt={name} onError={() => setImageError(true)} />
                {(name || '').trim().charAt(0)}
            </div>

            <div className={styles.cardRow}>
                {noWrapLine(name)}
            </div>

            <div className={styles.cardRow}>
                {position && noWrapLine(position)}
                {email && noWrapLine(email)}
                {phone && noWrapLine(phone)}
            </div>
        </div>
    )
}

function noWrapLine(text) {
    return (<span className={styles.cardNowrap}>{text}</span>)
}