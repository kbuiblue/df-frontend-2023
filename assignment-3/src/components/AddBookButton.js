import React, { useContext } from "react";
import styles from "../styles/SearchBar.module.css";
import { ModalInterface, ThemeInterface } from "./context/context";

export default function AddBookButton() {
    const { handleModalType, handleOpen } = useContext(ModalContext);
    const { theme } = useContext(ThemeContext);

    const addBookModal = () => {
        handleModalType("add");
        handleOpen();
    };

    return (
        <button
            className={`${theme.type === "dark" && styles.dark} ${
                styles.button
            }`}
            onClick={addBookModal}
        >
            Add Book
        </button>
    );
}
