import React, { useContext } from "react";
import styles from "../styles/Footer.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import heartIcon from "../images/heart-icon.svg";
import { ModalContext, ThemeContext } from "./context";

export default function Footer() {
    const { isOpen } = useContext(ModalContext);
    const { theme } = useContext(ThemeContext);

    return (
        <footer
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.footer}`
                    : styles.footer
            }
        >
            <div className={styles.copyright}>
                &copy; 2023 || Made with
                <img src={heartIcon} alt="Red heart icon" /> ||
                <a
                    className={`${theme.type === "dark" && styles.dark} ${styles.sourceLink}`}
                    href="https://github.com/kbuiblue/df-frontend-2023/tree/main/assignment-2"
                >
                    Source code
                </a>
            </div>
        </footer>
    );
}
