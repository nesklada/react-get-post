import { getSectionId } from 'layout/GetSection/GetSection';
import { postSectionID } from 'layout/PostSection/PostSection';
import Logo from 'layout/Logo/Logo';
import Button from 'components/Button/Button';

import styles from './Header.module.scss';
import stylesGrid from 'scss/grid.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`${stylesGrid.container} ${styles.headerGrid}`}>
                <Logo disable={true} />

                <div className={styles.headerControls}>
                    <Button scrollTo={getSectionId}>Users</Button>
                    <Button scrollTo={postSectionID}>Sign up</Button>
                </div>
            </div>
        </header>
    )
}