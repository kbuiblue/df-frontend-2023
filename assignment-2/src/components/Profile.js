import React from "react";
import styles from '../styles/Profile.module.css';
import profile from '../images/kb-logo.png'

export default function Profile() {
    return (
        <a href="https://github.com/kbuiblue" target="_blank" rel="noreferrer">
            <div className={styles.userContainer}>
                <img src={profile} alt="Profile" />
                <p>Khanh Bui</p>
            </div>
        </a>
    );
}
