import React, { useContext } from "react";
import styles from "../styles/Header.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import Profile from "./Profile";
import { ModalContext } from "./context";

export default function Header() {
    const { isOpen } = useContext(ModalContext);

    return (
        <header
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.header}`
                    : styles.header
            }
        >
            <h1>
                <span>Book</span>store
            </h1>
            <Profile />
        </header>
    );
}
