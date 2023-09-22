import { createContext } from "react";

export const BooksContext = createContext({
    books: [],
    addBook: (book) => {},
    removeBook: (index) => {},
});

export const ModalContext = createContext({
    isOpen: false,
    type: "",
    currentBookIndex: 0,
    handleBookIndex: (index) => {},
    handleType: (newType) => {},
    handleOpen: () => {},
    handleClose: () => {},
});
