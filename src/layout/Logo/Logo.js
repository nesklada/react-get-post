import logoSrc from 'img/logo.svg'
import styles from './Logo.module.scss'

export default function Logo({disable, extClassNames}) {
    return (
        <a href='/' className={`${styles.brandLogo} ${extClassNames || ''} ${disable ? styles.isDisable : ''}`} title="TestTask">
            <span className={styles.brandLogoName}>TestTask</span>
            <img src={logoSrc} alt="" />
        </a>
    )
}