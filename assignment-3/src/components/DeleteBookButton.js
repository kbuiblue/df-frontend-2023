import React, { useContext } from "react";
import styles from "../styles/DeleteBookButton.module.css";
import { ModalContext } from "./context/context";

export default function DeleteBookButton({ index }) {
    const { handleModalType, handleOpen, handleBookIndex } = useContext(ModalContext);

    const deleteBookModal = () => {
        handleModalType("delete")
        handleBookIndex(index)
        handleOpen()
    }

    return (
        <td className={styles.deleteButton} onClick={deleteBookModal}>
            Delete
        </td>
    );
}
