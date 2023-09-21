import React from "react";
import styles from "../styles/SearchBar.module.css"

export default function SearchBar() {
    return (
        <div className={styles.searchBar}>
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
