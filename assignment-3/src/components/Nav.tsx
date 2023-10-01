import React, { useContext } from 'react'
import styles from '../styles/Nav.module.css'
import disableStyles from '../styles/DisableStyles.module.css'
import { ModalContext, BooksContext, ThemeContext } from './context/context'

const Nav: React.FC = () => {
    const { isOpen } = useContext(ModalContext)
    const { pages, activePageNumber, setCurrentPage, setActivePageNumber } =
        useContext(BooksContext)
    const { theme } = useContext(ThemeContext)

    const handlePageClick = (pageNumber) => {
        setActivePageNumber(pageNumber)
    }

    return (
        <nav
            className={
                isOpen
                    ? `${disableStyles.disabled} ${styles.paginationContainer}`
                    : styles.paginationContainer
            }
        >
            <button
                className={`${activePageNumber === 1 && styles.disabled} ${
                    theme.type === 'dark' && styles.dark
                } ${styles.paginationButton}`}
                id="prev-button"
                aria-label="Previous page"
                title="Previous page"
                onClick={() => {
                    if (activePageNumber > 1) {
                        setActivePageNumber(
                            (prevActivePage) => prevActivePage - 1,
                        )
                        setCurrentPage(pages[activePageNumber - 1])
                    }
                }}
            >
                &lt;
            </button>

            <div>
                {pages.map((_, index) => {
                    const pageNumber = index + 1

                    return (
                        <button
                            className={`${
                                activePageNumber === pageNumber && styles.active
                            } ${theme.type === 'dark' && styles.dark} ${
                                styles.paginationButton
                            }`}
                            key={index}
                            onClick={() => handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>

            <button
                className={`${
                    activePageNumber === pages.length && styles.disabled
                } ${theme.type === 'dark' && styles.dark} ${
                    styles.paginationButton
                }`}
                id="next-button"
                aria-label="Next page"
                title="Next page"
                onClick={() => {
                    setActivePageNumber((prevActivePage) => prevActivePage + 1)
                    setCurrentPage(pages[activePageNumber - 1])
                }}
            >
                &gt;
            </button>
        </nav>
    )
}

export default Nav;
