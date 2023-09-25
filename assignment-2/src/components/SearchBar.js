import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";
import disableStyles from "../styles/DisableStyles.module.css";
import { BooksContext, ModalContext } from "./context";
import AddBookButton from "./AddBookButton";

export default function SearchBar() {
    const { isOpen } = useContext(ModalContext);
    const {
        books,
        pages,
        setCurrentPage,
        getPagination,
    } = useContext(BooksContext);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            let newPages;

            if (searchTerm) {
                const filteredBooks = books.filter((book) =>
                    book.name.toLowerCase().trim().includes(searchTerm)
                );

                newPages = getPagination(filteredBooks);
                setCurrentPage(newPages[0]);
            } else {
                setCurrentPage(pages[0]);
            }
        }, 300);

        return () => clearTimeout(timeOut);
    }, [searchTerm]);

    const handleSearchInput = (input) => {
        setSearchTerm(input.toLowerCase().trim());
    };

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
                onChange={(event) => handleSearchInput(event.target.value)}
            />
            <AddBookButton />
        </div>
    );
}
