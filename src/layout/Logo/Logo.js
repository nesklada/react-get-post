import logoSrc from 'img/logo.svg'
import styles from './Logo.module.scss'

export default function Logo({disable, extClassNames}) {
    return (
        <a href='/' className={`${extClassNames || ''} ${disable ? styles.disable : ''}`}>
            <img src={logoSrc} alt="" />
        </a>
    )
}