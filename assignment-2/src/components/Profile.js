import React, { useContext } from "react";
import styles from "../styles/Profile.module.css";
import profile from "../images/kb-logo.png";
import { ThemeContext } from "./context";

export default function Profile() {
    const { theme } = useContext(ThemeContext);

    return (
        <a href="https://github.com/kbuiblue" target="_blank" rel="noreferrer">
            <div className={`${theme.type === "dark" && styles.dark} ${styles.userContainer}`}>
                <img
                    className={styles.profileIcon}
                    src={profile}
                    alt="Profile"
                />
                <p>Khanh Bui</p>
            </div>
        </a>
    );
}
