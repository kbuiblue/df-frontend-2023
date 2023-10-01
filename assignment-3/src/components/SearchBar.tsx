import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/SearchBar.module.css'
import disableStyles from '../styles/DisableStyles.module.css'
import { BooksContext, ModalContext, ThemeContext } from './context/context'
import AddBookButton from './AddBookButton'

const SearchBar: React.FC = () => {
    const booksContext = useContext(BooksContext)

    if (!booksContext) {
        throw new Error('SearchBar must be used within a BooksProvider')
    }

    const { isOpen } = useContext(ModalContext)
    const { booksRef, pagesRef, setCurrentPage, getPagination } =
        useContext(BooksContext)
    const { theme } = useContext(ThemeContext)
    const [searchTerm, setSearchTerm] = useState(null)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            let newPages

            if (searchTerm) {
                const filteredBooks = booksRef.current.filter((book) =>
                    book.name.toLowerCase().trim().includes(searchTerm),
                )

                newPages = getPagination(filteredBooks)
                setCurrentPage(newPages[0])
            } else {
                setCurrentPage(pagesRef.current[0])
            }
        }, 300)

        return () => clearTimeout(timeOut)
    }, [searchTerm, getPagination, setCurrentPage, booksRef, pagesRef])

    const handleSearchInput = (input) => {
        setSearchTerm(input.toLowerCase().trim())
    }

    return (
        <div
            className={`${theme?.type === 'dark' ? styles.dark : ""} ${
                isOpen && disableStyles.disabled
            } ${styles.searchBar}`}
        >
            <input
                className={`${theme?.type === 'dark' ? styles.dark : ""} ${
                    isOpen && disableStyles.disabled
                } ${styles.searchInput}`}
                placeholder="Search books"
                type="text"
                onChange={(event) => handleSearchInput(event.target.value)}
            />
            <AddBookButton />
        </div>
    )
}

export default SearchBar
