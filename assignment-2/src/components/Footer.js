import React from "react";
import styles from "../styles/Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                &copy; 2023 || Made with <img src="/heart-icon.svg" alt="Red heart icon" /> ||
                <a href="https://github.com/kbuiblue/df-frontend-2023/tree/main/assignment-1">
                    Source code
                </a>
            </div>
        </footer>
    );
}
