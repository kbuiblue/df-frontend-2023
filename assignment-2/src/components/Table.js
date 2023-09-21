import React, { useContext } from "react";
import styles from "../styles/Table.module.css";
import { BooksContext } from "./context";

export default function Table() {
    const { books } = useContext(BooksContext);

    if (!Array.isArray(books)) {
        return <div>No books found</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th className={styles.tableHeading}>Name</th>
                    <th className={styles.tableHeading}>Author</th>
                    <th className={styles.tableHeading}>Topic</th>
                    <th className={styles.tableHeading}>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => {
                    return (
                        <tr>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.topic}</td>
                            <td className={styles.deleteButton}>Delete</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
