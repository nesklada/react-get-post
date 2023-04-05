import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import CustomTooltip from 'components/CustomTooltip/CustomTooltip';

import styles from './Card.module.scss';

const Card = forwardRef(({
    photo,
    name,
    email,
    position,
    phone
}, ref) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            ref={ref}
            className={styles.card}>
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
    )
})

function OverflowText({ text }) {
    const [isTooltip, setIsTooltip] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const isOverflow = ref.current.scrollWidth > ref.current.clientWidth;

        if (!isOverflow) {
            return
        }

        setIsTooltip(isOverflow);
    }, []);

    return (<>
        {isTooltip ?
            <CustomTooltip
                title={text}
                placement="bottom"
            >
                <div ref={ref} className={styles.cardNowrap}>{text}</div>
            </CustomTooltip> :
            <div ref={ref} className={styles.cardNowrap}>{text}</div>
        }
    </>)
}

export const MotionCard = motion(Card);

export default Card;