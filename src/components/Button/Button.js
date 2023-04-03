import { useCallback } from 'react'
import styles from './Button.module.scss'

export default function Button({ onClick, disabled, type, scrollTo, disabledClass, children }) {

    const scrollHandle = useCallback((e) => {
        e.preventDefault();

        if (onClick) {
            onClick(e);
        }

        scrollToNodeID(scrollTo);
    }, [onClick, scrollTo]);

    return (
        <button className={`${styles.btn} ${disabledClass ? styles.btnDisabled : ''}`}
            onClick={scrollTo ? scrollHandle : onClick}
            disabled={disabled}
            type={type || 'button'}>
            {children}
        </button>
    )
}

export function scrollToNodeID(id) {
    const target = document.getElementById(id);

    if (target) {
        target.scrollIntoView({ behavior: "smooth" })
    }
} 