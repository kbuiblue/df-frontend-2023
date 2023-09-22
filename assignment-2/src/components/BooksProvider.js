import { useEffect, useState } from "react";
import { BooksContext } from "./context";

export const BooksProvider = ({ children }) => {
    const defaultBooks = [
        {
            name: "Design Patterns: Elements of Reusable Object-Oriented Software",
            author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, Grady Booch (Foreword)",
            topic: "Design patterns",
        },
        {
            name: "The Pragmatic Programmer: From Journeyman to Master",
            author: "Andrew Hunt, David Thomas",
            topic: "Computer programming",
        },
        {
            name: "Clean Code: A Handbook of Agile Software Craftsmanship",
            author: "Robert Cecil Martin",
            topic: "Software design",
        },
        {
            name: "Cracking the Coding Interview",
            author: "Gayle Laakmann McDowell",
            topic: "Coding interview",
        },
        {
            name: "Refactoring: Improving the Design of Existing Code",
            author: "Martin Fowler",
            topic: "Code refactoring",
        },
    ];

    const storedBooks = JSON.parse(localStorage.getItem("books"));
    const [books, setBooks] = useState(
        storedBooks ? storedBooks : defaultBooks
    );

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books, storedBooks]);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const removeBook = (index) => {
        setBooks([...books.slice(0, index), ...books.slice(index + 1)]);
    };

    return (
        <BooksContext.Provider value={{ books, addBook, removeBook }}>
            {children}
        </BooksContext.Provider>
    );
};
