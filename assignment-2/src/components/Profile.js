import React from "react";
import styles from '../styles/Profile.module.css';

export default function Profile() {
    return (
        <a href="https://github.com/kbuiblue" target="_blank" rel="noreferrer">
            <div className={styles.userContainer}>
                <img src="/kb-logo.png" alt="Profile" />
                <p>Khanh Bui</p>
            </div>
        </a>
    );
}
