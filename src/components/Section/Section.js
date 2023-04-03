import styles from './Section.module.scss';

export default function Section({children, type, className , id}) {
    const htmlClass = [styles.section , (className || '')].join(' ');

    switch(type) {
        case 'div':
            return (<div className={htmlClass} id={id}>{children}</div>)
        default:
            return (<section className={htmlClass} id={id}>{children}</section>)
    }
}
