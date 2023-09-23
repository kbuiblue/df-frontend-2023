import React, { useContext, useState } from "react";
import styles from "../styles/Modal.module.css";
import { BooksContext, ModalContext } from "./context";

export default function Modal() {
    const { books, addBook, removeBook } = useContext(BooksContext);
    const { type, isOpen, currentBookIndex, handleClose } =
        useContext(ModalContext);

    const [userInput, setUserInput] = useState({
        name: "",
        author: "",
        topic: "",
    });

    const topicsSet = new Set(books.map((book) => book.topic));
    const topicsArray = Array.from(topicsSet);
    const deletedBook = books[currentBookIndex];

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
        setUserInput({
            name: "",
            author: "",
            topic: "",
        });
        handleClose();
    };

    const handleBookRemoval = () => {
        removeBook(currentBookIndex);
        handleClose();
    };

    const renderModal = (type) => {
        switch (type) {
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
                                onClick={handleBookRemoval}
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
                            />
                            <label for="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                onChange={(event) =>
                                    handleAuthorInput(event.target.value)
                                }
                            />
                            <label for="topic">Topic</label>
                            <select
                                id="topic"
                                name="topic"
                                defaultValue=""
                                onChange={(event) =>
                                    handleSelectInput(event.target.value)
                                }
                            >
                                <option
                                    className={styles.defaultValue}
                                    value=""
                                >
                                    Choose a topic
                                </option>
                                {topicsArray.map((topic) => (
                                    <option value={topic}>{topic}</option>
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
        <>{isOpen && <div className={styles.modal}>{renderModal(type)}</div>}</>
    );
}
