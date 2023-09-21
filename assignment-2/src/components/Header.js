import React from "react";
import styles from "../styles/Header.module.css"
import Profile from "./Profile";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>
                <span>Book</span>store
            </h1>
            <Profile />
        </header>
    );
}
