import React, { useContext } from "react";
import styles from "../styles/ThemeToggle.module.css";
import moonIcon from "../images/moon-icon.svg";
import sunIcon from "../images/sun-icon.svg";
import { ThemeContext } from "./context/context";

export default function ThemeToggle() {
    const { theme, handleSettingTheme } = useContext(ThemeContext);
    const isChecked = theme.isChecked;

    return (
        <div>
            <input
                className={styles.checkbox}
                type="checkbox"
                id="checkbox"
                onChange={handleSettingTheme}
                defaultChecked={isChecked}
            />
            <label
                for="checkbox"
                className={
                    theme.type === "dark"
                        ? `${styles.checkboxLabel} ${styles.dark}`
                        : styles.checkboxLabel
                }
            >
                <img
                    className={styles.moon}
                    src={moonIcon}
                    alt="Dark mode toggle"
                ></img>
                <img
                    className={styles.sun}
                    src={sunIcon}
                    alt="Light mode toggle"
                ></img>
                <span
                    className={
                        theme.type === "dark"
                            ? `${styles.ball} ${styles.dark}`
                            : styles.ball
                    }
                ></span>
            </label>
        </div>
    );
}
