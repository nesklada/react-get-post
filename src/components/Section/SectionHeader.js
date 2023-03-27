import styles from './Section.module.scss';

export default function SectionHeader({children}) {
    return <div className={styles.sectionHeader}>
        {children}
    </div>
}