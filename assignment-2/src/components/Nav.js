import React, { useContext } from "react";
import styles from "../styles/Nav.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import { ModalContext } from "./context";

export default function Nav() {
    const { isOpen } = useContext(ModalContext);

    return (
        <nav
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.paginationContainer}`
                    : styles.paginationContainer
            }
        >
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
