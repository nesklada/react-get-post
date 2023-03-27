import styles from './Button.module.scss'

export default function Button({ onClick, disabled, type, children }) {
    return (
        <button className={styles.btn} 
                onClick={onClick} 
                disabled={disabled}
                type={type || 'button'}>
            {children}
        </button>
    )
}