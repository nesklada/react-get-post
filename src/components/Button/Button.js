import { useCallback } from 'react'
import styles from './Button.module.scss'

export default function Button({ onClick, disabled, type, scrollTo, disabledClass, children }) {

    const handleClick = useCallback((e) => {
        if(onClick){
            onClick(e)
        }

        if(scrollTo) {
            scrollToID(scrollTo);
        }
    }, [scrollTo, onClick]);

    return (
        <button className={`${styles.btn} ${disabledClass ? styles.btnDisabled : ''}`}
            onClick={handleClick}
            disabled={disabled}
            type={type || 'button'}>
            {children}
        </button>
    )
}

export function scrollToID(id) {
    const target = document.getElementById(id);

    if (target) {
        target.scrollIntoView({ behavior: "smooth" })
    }
} 