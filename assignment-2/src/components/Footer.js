import React, { useContext } from "react";
import styles from "../styles/Footer.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import { ModalContext } from "./context";

export default function Footer() {
    const { isOpen } = useContext(ModalContext);

    return (
        <footer
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.footer}`
                    : styles.footer
            }
        >
            <div className={styles.copyright}>
                &copy; 2023 || Made with{" "}
                <img src="/heart-icon.svg" alt="Red heart icon" /> ||
                <a href="https://github.com/kbuiblue/df-frontend-2023/tree/main/assignment-1">
                    Source code
                </a>
            </div>
        </footer>
    );
}
