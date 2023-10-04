import React, {useContext} from 'react'
import styles from '../styles/Header.module.css'
import disableStyles from '../styles/DisableStyles.module.css'
import Profile from './Profile'
import ThemeToggle from './ThemeToggle'
import { AppProps } from './types'
import { ThemeContext, ModalContext } from './context/context'

const Header: React.FC<AppProps> = () =>  {
    const { theme } = useContext(ThemeContext);
    const {isOpen} = useContext(ModalContext)

    return (
        <header
            className={`${isOpen && disableStyles.disabled} ${styles.header}`}
        >
            <h1
                className={`${theme?.type === 'dark' ? styles.dark : ""} ${
                    styles.heading
                }`}
            >
                <span
                    className={`${theme?.type === 'dark' ? styles.dark : ""} ${
                        styles.highlight
                    }`}
                >
                    Book
                </span>
                store
            </h1>
            <div className={styles.rightHeader}>
                <ThemeToggle />
                <Profile />
            </div>
        </header>
    )
}

export default Header;
