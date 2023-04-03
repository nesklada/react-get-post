import styles from './Section.module.scss';

export default function Section({children, type, className , id}) {
    const htmlClass = [styles.section , (className || '')].join(' ');
    const Elem = `${type === 'div' ? 'div' : 'section'}`;

    return (<Elem className={htmlClass} id={id}>
        {children}
    </Elem>)
}
