
import styles from './Entry.module.scss';
import entryBgSrc from 'img/entry-bg.jpg';

export default function Entry({children, bgImageSrc}) {
    return (
        <div className={styles.entryBg} style={{
            'backgroundImage': `url('${bgImageSrc || entryBgSrc}')`
        }}>
            <div className={styles.entry}>
                <div className={styles.entryContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}