import { createContext } from "react";

export const BooksContext = createContext({
    books: [],
    pages: [],
    currentPage: [],
    activePageNumber: 1,
    addBook: (book) => {},
    removeBook: (index) => {},
    setPages: (pages) => {},
    setCurrentPage: (page) => {},
    setActivePageNumber: (pageNumber) => {},
    getPagination: () => {}
});

export const ModalContext = createContext({
    isOpen: false,
    modalType: "",
    currentBookIndex: 0,
    handleBookIndex: (index) => {},
    handleModalType: (newModalType) => {},
    handleOpen: () => {},
    handleClose: () => {},
});
