import React from "react";
import styles from "../styles/Nav.module.css"

export default function Nav() {
    return (
        <nav className={styles.paginationContainer}>
            <button
                className={styles.paginationButton}
                id="prev-button"
                aria-label="Previous page"
                title="Previous page"
            >
                &lt;
            </button>

            <div id={styles.paginationNumber}></div>

            <button
                className={styles.paginationButton}
                id="next-button"
                aria-label="Next page"
                title="Next page"
            >
                &gt;
            </button>
        </nav>
    );
}
