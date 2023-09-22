import React, { useContext } from "react";
import styles from "../styles/Modal.module.css";
import { BooksContext, ModalContext } from "./context";

export default function Modal() {
    const { books, addBook, removeBook } = useContext(BooksContext);
    const { type, isOpen, currentBookIndex, handleClose } =
        useContext(ModalContext);
    const deletedBook = books[currentBookIndex];

    // const handleBookAddition = () => {
    //     addBook();
    // };

    const handleBookRemoval = () => {
        removeBook(currentBookIndex);
        handleClose();
    };

    const renderModal = () => {
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
                            <strong>{deletedBook.name}?</strong>
                        </h3>
                        <div className={styles.modalButton}>
                            <button
                                className={styles.secondaryButton}
                                onClick={handleBookRemoval}
                            >
                                Delete
                            </button>
                            <button className={styles.button}>Cancel</button>
                        </div>
                    </div>
                );
            // case "add":
            //     return (
            //         <div className={styles.modalContent}>
            //             <div class="modal-top">
            //                 <h2>
            //                     <span>Add</span> Book
            //                 </h2>
            //                 <img
            //                     class="close-icon"
            //                     src="/close-icon.svg"
            //                     alt="Close button"
            //                     onClick={handleClose}
            //                 />
            //             </div>
            //             <form>
            //                 <label for="name">Name</label>
            //                 <input type="text" id="name" name="name" />
            //                 <label for="author">Author</label>
            //                 <input type="text" id="author" name="author" />
            //                 <label for="topic">Topic</label>
            //                 <select id="topic" name="topic"></select>
            //                 <button class="button">Create</button>
            //             </form>
            //         </div>
            //     );
            default:
                return <div>ERROR</div>;
        }
    };
    return (
        <>
            {isOpen && (
                <div className={styles.modal}>
                    {renderModal()}
                </div>
            )}
        </>
    );
}
