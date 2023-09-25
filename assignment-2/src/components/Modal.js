import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import { BooksContext, ModalContext } from "./context";

export default function Modal() {
    const { books, addBook, removeBook } = useContext(BooksContext);
    const { currentPage } = useContext(BooksContext);
    const { modalType, isOpen, currentBookIndex, handleClose } =
        useContext(ModalContext);

    const [userInput, setUserInput] = useState({
        name: "",
        author: "",
        topic: "",
    });

    const topicsSet = new Set(books.map((book) => book.topic));
    const topicsArray = Array.from(topicsSet);
    const deletedBook = currentPage && currentPage[currentBookIndex];


    const handleNameInput = (value) => {
        if (value) {
            setUserInput((prevInput) => ({
                ...prevInput,
                name: value,
            }));
        }
    };

    const handleAuthorInput = (value) => {
        if (value) {
            setUserInput((prevInput) => ({
                ...prevInput,
                author: value,
            }));
        }
    };

    const handleSelectInput = (value) => {
        if (value) {
            setUserInput((prevInput) => ({
                ...prevInput,
                topic: value,
            }));
        }
    };

    const handleBookAddition = (event) => {
        event.preventDefault();

        addBook(userInput);

        handleClose();
    };

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 300 + books.length);

        setUserInput((prevUserInput) => ({
            ...prevUserInput,
            id: `${randomNumber}${userInput.name}`,
        }));
    }, [isOpen]);

    useEffect(() => {
        setUserInput({
            name: "",
            author: "",
            topic: "",
        });
    }, [books]);

    const handleBookRemoval = (deletedBook) => {
        removeBook(deletedBook);
        handleClose();
    };

    const renderModal = (modalType) => {
        switch (modalType) {
            case "delete":
                return (
                    <div className={styles.modalDelete}>
                        <div className={styles.modalTop}>
                            <h2>
                                <span>Delete</span> Book
                            </h2>
                            <img
                                className={styles.closeIcon}
                                src="/close-icon.svg"
                                alt="Close button"
                                onClick={handleClose}
                            />
                        </div>
                        <h3>
                            Do you want to delete <br />
                            <strong className={styles.bookTitle}>
                                {deletedBook.name}?
                            </strong>
                        </h3>
                        <div className={styles.modalButton}>
                            <button
                                className={styles.secondaryButton}
                                onClick={() => handleBookRemoval(deletedBook)}
                            >
                                Delete
                            </button>
                            <button
                                className={styles.button}
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                );
            case "add":
                return (
                    <div>
                        <div className={styles.modalTop}>
                            <h2>
                                <span>Add</span> Book
                            </h2>
                            <img
                                className={styles.closeIcon}
                                src="/close-icon.svg"
                                alt="Close button"
                                onClick={handleClose}
                            />
                        </div>
                        <form>
                            <label for="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(event) =>
                                    handleNameInput(event.target.value)
                                }
                                value={userInput.name}
                            />
                            <label for="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                onChange={(event) =>
                                    handleAuthorInput(event.target.value)
                                }
                                value={userInput.author}
                            />
                            <label for="topic">Topic</label>
                            <select
                                id="topic"
                                name="topic"
                                defaultValue={
                                    userInput.topic ? userInput.topic : null
                                }
                                onChange={(event) =>
                                    handleSelectInput(event.target.value)
                                }
                                required
                            >
                                <option
                                    className={styles.defaultValue}
                                    value={null}
                                >
                                    Choose a topic
                                </option>
                                {topicsArray.map((topic, index) => (
                                    <option key={index} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="button"
                                onClick={(event) => handleBookAddition(event)}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                );
            default:
                return <div>ERROR</div>;
        }
    };
    return (
        <>
            {isOpen && (
                <div className={styles.modal}>{renderModal(modalType)}</div>
            )}
        </>
    );
}
