import React, { useContext } from "react";
import styles from "../styles/SearchBar.module.css";
import { ModalContext } from "./context";

export default function AddBookButton() {
    const { handleType, handleOpen } = useContext(ModalContext);

    const addBookModal = () => {
        handleType("add");
        handleOpen();
    };

    return (
        <button className={styles.button} onClick={addBookModal}>
            Add Book
        </button>
    );
}
