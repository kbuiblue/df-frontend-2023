import React from 'react'
import styles from '../styles/Header.module.css'
import disableStyles from '../styles/DisableStyles.module.css'
import Profile from './Profile'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
    isOpen?: boolean
    theme?: { type: 'light' | 'dark' }
}
const Header: React.FC<HeaderProps> = ({ isOpen, theme }) =>  {

    return (
        <header
            className={`${isOpen && disableStyles.disabled} ${styles.header}`}
        >
            <h1
                className={`${theme?.type === 'dark' && styles.dark} ${
                    styles.heading
                }`}
            >
                <span
                    className={`${theme?.type === 'dark' && styles.dark} ${
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