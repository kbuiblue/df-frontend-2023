import { createContext } from "react";

export const BooksContext = createContext({
    books: [],
    addBook: (book) => {},
    removeBook: (index) => {},
});
