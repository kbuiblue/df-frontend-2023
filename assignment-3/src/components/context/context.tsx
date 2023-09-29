import { createContext, MutableRefObject } from 'react'
import { Book, BooksInterface, ModalInterface, ThemeInterface } from '../types'

export const BooksContext = createContext<BooksInterface>({
    books: [] as Book[],
    pages: [] as Book[][],
    currentPage: [] as Book[],
    activePageNumber: 1 as number,
    addBook: () => {},
    removeBook: () => {},
    setPages: () => {},
    setCurrentPage: () => {},
    setActivePageNumber: () => {},
    getPagination: () => [] as Book[][],
    booksRef: [] as unknown as MutableRefObject<Book[]>, 
    pagesRef: [] as unknown as MutableRefObject<Book[][]>, 
})

export const ModalContext = createContext<ModalInterface>({
    isOpen: false,
    modalType: '',
    currentBookIndex: 0,
    handleBookIndex: () => {},
    handleModalType: () => {},
    handleOpen: () => {},
    handleClose: () => {},
})

export const ThemeContext = createContext<ThemeInterface>({
    theme: { isChecked: false, type: 'light' },
    handleSettingTheme: () => {},
})
