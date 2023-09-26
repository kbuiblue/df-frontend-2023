import React, { useContext, useEffect } from "react";
import styles from "../styles/Table.module.css";
import { BooksContext, ModalContext, ThemeContext } from "./context";
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
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (currentPage == null) {
            setCurrentPage(pages[activePageNumber - 2] || pages[0]);
            setActivePageNumber(activePageNumber - 1);
        } else {
            setCurrentPage(pages[activePageNumber - 1]);
        }
    }, [activePageNumber]);

    if (!Array.isArray(pages)) {
        return <div>No books found</div>;
    }

    return (
        <section
            className={
                theme.type === "dark"
                    ? `${styles.tableContainer} ${styles.dark}`
                    : styles.tableContainer
            }
        >
            <table
                className={
                    isOpen
                        ? `${disableStyles.disabled} ${styles.table}`
                        : styles.table
                }
            >
                <thead>
                    <tr>
                        <th
                            className={`${
                                theme.type === "dark" && styles.dark
                            } ${styles.tableHeading}`}
                        >
                            Name
                        </th>
                        <th
                            className={`${
                                theme.type === "dark" && styles.dark
                            } ${styles.tableHeading}`}
                        >
                            Author
                        </th>
                        <th
                            className={`${
                                theme.type === "dark" && styles.dark
                            } ${styles.tableHeading}`}
                        >
                            Topic
                        </th>
                        <th
                            className={`${
                                theme.type === "dark" && styles.dark
                            } ${styles.tableHeading}`}
                        >
                            Action
                        </th>
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
        </section>
    );
}
