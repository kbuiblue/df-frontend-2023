import { useEffect, useState } from "react";
import { BooksContext } from "./context";

export const BooksProvider = ({ children }) => {
    const defaultBooks = [
        {
            id: 0,
            name: "Design Patterns: Elements of Reusable Object-Oriented Software",
            author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, Grady Booch (Foreword)",
            topic: "Design patterns",
        },
        {
            id: 1,
            name: "The Pragmatic Programmer: From Journeyman to Master",
            author: "Andrew Hunt, David Thomas",
            topic: "Computer programming",
        },
        {
            id: 2,
            name: "Clean Code: A Handbook of Agile Software Craftsmanship",
            author: "Robert Cecil Martin",
            topic: "Software design",
        },
        {
            id: 3,
            name: "Cracking the Coding Interview",
            author: "Gayle Laakmann McDowell",
            topic: "Coding interview",
        },
        {
            id: 4,
            name: "Refactoring: Improving the Design of Existing Code",
            author: "Martin Fowler",
            topic: "Code refactoring",
        },
    ];

    const PAGINATION_LIMIT = 5;

    const getPagination = (booksArray) => {
        const pages = [];

        const booksArr = booksArray ? booksArray : books;

        for (let i = 0; i < booksArr.length; i += PAGINATION_LIMIT) {
            const page = booksArr.slice(i, i + PAGINATION_LIMIT);
            pages.push(page);
        }
        return pages;
    };

    const storedBooks = JSON.parse(localStorage.getItem("books"));
    const [books, setBooks] = useState(
        storedBooks ? storedBooks : defaultBooks
    );
    const [pages, setPages] = useState(getPagination);
    const [currentPage, setCurrentPage] = useState(pages[0]);
    const [activePageNumber, setActivePageNumber] = useState(1);

    useEffect(() => {
        const newPages = getPagination();

        setPages(newPages);
        setCurrentPage(newPages[activePageNumber - 1]);

        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const removeBook = (deletedBook) => {
        const remainingBooks = books.filter(
            (book) => book.id !== deletedBook.id
        );
        setBooks([...remainingBooks]);
    };

    return (
        <BooksContext.Provider
            value={{
                books,
                pages,
                currentPage,
                activePageNumber,
                addBook,
                removeBook,
                setPages,
                setCurrentPage,
                setActivePageNumber,
                getPagination,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
};
