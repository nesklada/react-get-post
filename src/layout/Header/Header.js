
import styles from './Header.module.scss';
import stylesGrid from 'scss/grid.module.scss';
import Logo from 'layout/Logo/Logo';
import Button from 'components/Button/Button';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`${stylesGrid.container} ${styles.headerGrid}`}>
                <Logo disable={true}/>

                <div className={styles.headerControls}>
                    <Button>Users</Button>
                    <Button>Sign up</Button>
                </div>
            </div>
        </header>
    )
}