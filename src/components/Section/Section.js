import styles from './Section.module.scss';

export default function Section({children, type, className}) {
    const htmlClass = [styles.section , (className || '')].join(' ');

    switch(type) {
        case 'div':
            return (<div className={htmlClass}>{children}</div>)
        default:
            return (<section className={htmlClass}>{children}</section>)
    }
}
