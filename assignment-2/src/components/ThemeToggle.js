import React, { useContext } from "react";
import styles from "../styles/ThemeToggle.module.css";
import moonIcon from "../images/moon-icon.svg";
import sunIcon from "../images/sun-icon.svg";
import { ThemeContext } from "./context";

export default function ThemeToggle() {
    const { themeType, setThemeType } = useContext(ThemeContext);

    return (
        <div>
            <input className={styles.checkbox} type="checkbox" id="checkbox" />
            <label
                for="checkbox"
                className={
                    themeType === "dark"
                        ? `${styles.checkboxLabel}${styles.dark}`
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
                <span className={styles.ball}></span>
            </label>
        </div>
    );
}
