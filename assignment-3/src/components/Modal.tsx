import React, { useContext, useEffect, useState, useCallback } from 'react'
import styles from '../styles/Modal.module.css'
import { BooksContext, ModalContext, ThemeContext } from './context/context'
import closeIcon from '../images/close-icon.svg'
import closeIconDark from '../images/close-icon-dark.svg'

const Modal: React.FC = () => {
    const { books, addBook, removeBook } = useContext(BooksContext)
    const { currentPage } = useContext(BooksContext)
    const { modalType, isOpen, currentBookIndex, handleClose } =
        useContext(ModalContext)
    const { theme } = useContext(ThemeContext)

    const [userInput, setUserInput] = useState({
        name: '',
        author: '',
        topic: '',
    })

    const topicsSet = new Set(books.map((book) => book.topic))
    const topicsArray = Array.from(topicsSet)
    const deletedBook =
        currentPage && currentBookIndex && currentPage[currentBookIndex]

    const handleNameInput = (value) => {
        setUserInput((prevInput) => ({
            ...prevInput,
            name: value,
        }))
    }

    const handleAuthorInput = (value) => {
        setUserInput((prevInput) => ({
            ...prevInput,
            author: value,
        }))
    }

    const handleSelectInput = (value) => {
        setUserInput((prevInput) => ({
            ...prevInput,
            topic: value,
        }))
    }

    const handleBookAddition = (event) => {
        event.preventDefault()
        addBook(userInput)
        handleClose()
    }

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
                handleClose()
            }
        },
        [handleClose],
    )

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 300 + books.length)

        setUserInput((prevUserInput) => ({
            ...prevUserInput,
            id: `${randomNumber}${userInput.name}`,
        }))
    }, [userInput.name, isOpen, books.length])

    useEffect(() => {
        setUserInput({
            name: '',
            author: '',
            topic: '',
        })
    }, [books])

    const handleBookRemoval = (deletedBook) => {
        removeBook(deletedBook)
        handleClose()
    }

    const renderModal = (modalType) => {
        switch (modalType) {
            case 'delete':
                return (
                    <div className={`${styles.modalDelete}`}>
                        <div className={styles.modalTop}>
                            <h2>
                                <span
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.modalHighlight}`}
                                >
                                    Delete
                                </span>{' '}
                                Book
                            </h2>
                            <button
                                className={styles.closeButton}
                                onClick={handleClose}
                                onKeyDown={handleKeyDown}
                            >
                                <img
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.closeIcon}`}
                                    src={
                                        theme.type === 'dark'
                                            ? closeIconDark
                                            : closeIcon
                                    }
                                    alt="Close button"
                                />
                            </button>
                        </div>
                        <h3>
                            Do you want to delete <br />
                            <strong className={styles.bookTitle}>
                                {deletedBook && deletedBook.name}?
                            </strong>
                        </h3>
                        <div
                            className={`${
                                theme.type === 'dark' && styles.dark
                            } ${styles.modalButton}`}
                        >
                            <button
                                className={`${
                                    theme.type === 'dark' && styles.dark
                                } ${styles.secondaryButton}`}
                                onClick={() => handleBookRemoval(deletedBook)}
                            >
                                Delete
                            </button>
                            <button
                                className={`${
                                    theme.type === 'dark' && styles.dark
                                } ${styles.button}`}
                                onClick={handleClose}
                                onKeyDown={handleKeyDown}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            case 'add':
                return (
                    <div>
                        <div className={styles.modalTop}>
                            <h2>
                                <span
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.modalHighlight}`}
                                >
                                    Add
                                </span>{' '}
                                Book
                            </h2>
                            <button
                                className={styles.closeButton}
                                onClick={handleClose}
                                onKeyDown={handleKeyDown}
                            >
                                <img
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.closeIcon}`}
                                    src={
                                        theme.type === 'dark'
                                            ? closeIconDark
                                            : closeIcon
                                    }
                                    alt="Close button"
                                />
                            </button>
                        </div>
                        <form>
                            <label htmlFor="name">
                                Name
                                <input
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.formInput}`}
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(event) =>
                                        handleNameInput(event.target.value)
                                    }
                                    value={userInput.name}
                                />
                            </label>

                            <label htmlFor="author">
                                Author
                                <input
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.formInput}`}
                                    type="text"
                                    id="author"
                                    name="author"
                                    onChange={(event) =>
                                        handleAuthorInput(event.target.value)
                                    }
                                    value={userInput.author}
                                />
                            </label>

                            <label htmlFor="topic">
                                Topic
                                <select
                                    className={`${
                                        theme.type === 'dark' && styles.dark
                                    } ${styles.formInput}`}
                                    id="topic"
                                    name="topic"
                                    defaultValue={userInput.topic || ''}
                                    onChange={(event) =>
                                        handleSelectInput(event.target.value)
                                    }
                                    required
                                >
                                    <option
                                        className={styles.defaultValue}
                                        value=""
                                    >
                                        Choose a topic
                                    </option>
                                    {topicsArray.map((topic, index) => (
                                        <option
                                            className={`${styles.formOption}`}
                                            key={index}
                                            value={topic}
                                        >
                                            {topic}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button
                                className={`${
                                    theme.type === 'dark' && styles.dark
                                } ${styles.button}`}
                                onClick={(event) => handleBookAddition(event)}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                )
            default:
                return <div>ERROR</div>
        }
    }
    return (
        isOpen ? (
            <div
                className={`${theme.type === 'dark' && styles.dark} ${
                    styles.modal
                }`}
            >
                {renderModal(modalType)}
            </div>
        ) : null
    )
}

export default Modal;
