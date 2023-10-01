import React, { useContext } from 'react'
import styles from '../styles/ThemeToggle.module.css'
import moonIcon from '../images/moon-icon.svg'
import sunIcon from '../images/sun-icon.svg'
import { ThemeContext } from './context/context'

const ThemeToggle: React.FC = () => {
    const { theme, handleSettingTheme } = useContext(ThemeContext)
    const { isChecked } = theme

    return (
        <div>
            <label
                htmlFor="checkbox"
                className={
                    theme.type === 'dark'
                        ? `${styles.checkboxLabel} ${styles.dark}`
                        : styles.checkboxLabel
                }
            >
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    id="checkbox"
                    onChange={handleSettingTheme}
                    defaultChecked={isChecked}
                />
                <img
                    className={styles.moon}
                    src={moonIcon}
                    alt="Dark mode toggle"
                />
                <img
                    className={styles.sun}
                    src={sunIcon}
                    alt="Light mode toggle"
                />
                <span
                    id="checkbox"
                    className={
                        theme.type === 'dark'
                            ? `${styles.ball} ${styles.dark}`
                            : styles.ball
                    }
                />
            </label>
        </div>
    )
}

export default ThemeToggle
