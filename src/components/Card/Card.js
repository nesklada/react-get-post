import { useEffect, useRef, useState } from 'react';
import styles from './Card.module.scss';
import { tooltipClickableID } from 'components/Tooltip/Tooltip';

export default function Card({
    photo,
    name,
    email,
    position,
    phone
}) {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            <div className={styles.card}>
                <div className={`${styles.cardPhoto} ${styles.cardRow} ${imageError ? styles.cardPhotoLetter : ''}`}>
                    <img src={photo} alt={name} onError={() => setImageError(true)} />
                    {(name || '').trim().charAt(0)}
                </div>

                <div className={styles.cardRow}>
                    <OverflowText text={name} />
                </div>


                <div className={styles.cardRow}>
                    {position && <OverflowText text={position} />}
                    {email && <OverflowText text={email} />}
                    {phone && <OverflowText text={phone} />}
                </div>
            </div>
        </>
    )
}

function OverflowText({ text }) {
    const [isTooltip, setIsTooltip] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const isOverflow = ref.current.scrollWidth > ref.current.clientWidth;

        if(!isOverflow) {
            return
        }

        setIsTooltip(isOverflow);
    }, []);

    return (<div ref={ref}
            className={styles.cardNowrap}
            data-tooltip-id={tooltipClickableID}
            data-tooltip-content={isTooltip ? text : ''}>
        {text}
    </div>)
}