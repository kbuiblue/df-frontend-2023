import React, { useContext } from "react";
import styles from "../styles/SearchBar.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import { ModalContext } from "./context";

export default function SearchBar() {
    const { isOpen } = useContext(ModalContext);

    return (
        <div
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.searchBar}`
                    : styles.searchBar
            }
        >
            <input
                className={styles.searchInput}
                placeholder="Search books"
                type="text"
            />
            <button className={styles.button} id="add-button">
                Add Book
            </button>
        </div>
    );
}
