import React, { useContext, useEffect } from "react";
import styles from "../styles/Nav.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import { ModalContext, BooksContext } from "./context";

export default function Nav() {
    const { isOpen } = useContext(ModalContext);
    const {
        pages,
        activePageNumber,
        setCurrentPage,
        setActivePageNumber,
    } = useContext(BooksContext);

    const handlePageClick = (pageNumber) => {
        setActivePageNumber(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(pages[activePageNumber - 1]);
    }, [activePageNumber])

    return (
        <nav
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.paginationContainer}`
                    : styles.paginationContainer
            }
        >
            <button
                className={
                    activePageNumber === 1
                        ? `${styles.paginationButton} ${styles.disabled}`
                        : styles.paginationButton
                }
                id="prev-button"
                aria-label="Previous page"
                title="Previous page"
                onClick={() => {
                    setActivePageNumber((prevActivePage) => prevActivePage - 1);
                    setCurrentPage(pages[activePageNumber - 1]);
                }}
            >
                &lt;
            </button>

            <div>
                {pages.map((page, index) => {
                    const pageNumber = index + 1;

                    return (
                        <button
                            className={
                                activePageNumber === pageNumber
                                    ? `${styles.paginationButton} ${styles.active}`
                                    : styles.paginationButton
                            }
                            key={index}
                            onClick={() => handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                className={
                    activePageNumber === pages.length
                        ? `${styles.paginationButton} ${styles.disabled}`
                        : styles.paginationButton
                }
                id="next-button"
                aria-label="Next page"
                title="Next page"
                onClick={() => {
                    setActivePageNumber((prevActivePage) => prevActivePage + 1);
                    setCurrentPage(pages[activePageNumber - 1]);
                }}
            >
                &gt;
            </button>
        </nav>
    );
}
