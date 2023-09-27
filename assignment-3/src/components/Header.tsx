import React, { useContext } from "react";
import styles from "../styles/Header.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import Profile from "./Profile";
import { ModalContext, ThemeContext } from "./context/context";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const { isOpen } = useContext(ModalContext);
    const { theme } = useContext(ThemeContext);

    return (
        <header
            className={`${isOpen && disableStyles.disabled} ${styles.header}`}
        >
            <h1 className={`${theme.type === "dark" && styles.dark} ${styles.heading}`}>
                <span
                    className={`${theme.type === "dark" && styles.dark} ${
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
    );
}
