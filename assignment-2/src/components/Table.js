import React, { useContext, useEffect } from "react";
import styles from "../styles/Table.module.css";
import { BooksContext, ModalContext } from "./context";
import disableStyles from "../styles/DisableStyles.module.css";
import DeleteBookButton from "./DeleteBookButton";

export default function Table() {
    const {
        pages,
        currentPage,
        setCurrentPage,
        activePageNumber,
        setActivePageNumber,
    } = useContext(BooksContext);
    const { isOpen } = useContext(ModalContext);

    useEffect(() => {

        if (currentPage == null) {
            setCurrentPage(pages[activePageNumber - 2] || pages[0]);
            setActivePageNumber(activePageNumber - 1);
        }
    }, [currentPage, setCurrentPage, pages, activePageNumber]);

    if (!Array.isArray(pages)) {
        return <div>No books found</div>;
    }

    return (
        <table
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.table}`
                    : styles.table
            }
        >
            <thead>
                <tr>
                    <th className={styles.tableHeading}>Name</th>
                    <th className={styles.tableHeading}>Author</th>
                    <th className={styles.tableHeading}>Topic</th>
                    <th className={styles.tableHeading}>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentPage &&
                    currentPage.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.topic}</td>
                                <DeleteBookButton index={index} />
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
