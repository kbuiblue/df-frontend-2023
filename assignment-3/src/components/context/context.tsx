import { createContext } from 'react'

export interface Book {
    id: string
    name: string
    author: string
    topic: string
}

export interface BooksInterface {
    books: Book[]
    pages: Book[][]
    currentPage: Book[]
    activePageNumber: number
    addBook: (_book: Book) => void
    removeBook: (_deletedBook: Book) => void
    setPages: (_pages: Book[][]) => void
    setCurrentPage: (_currentPage: Book[]) => void
    setActivePageNumber: (_activePageNumber: number) => void
    getPagination: (_booksArray: Book[]) => Book[][]
}

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
})

export interface ModalInterface {
    isOpen: boolean,
    modalType: string | null,
    currentBookIndex: number | null,
    handleBookIndex: (_index: number) => void,
    handleModalType: (_type: string) => void,
    handleOpen: () => void,
    handleClose: () => void,
}

export const ModalContext = createContext<ModalInterface>({
    isOpen: false,
    modalType: '',
    currentBookIndex: 0,
    handleBookIndex: () => {},
    handleModalType: () => {},
    handleOpen: () => {},
    handleClose: () => {},
})

export interface Theme {
    isChecked: boolean,
    type: string
}

export interface ThemeInterface {
    theme: Theme,
    handleSettingTheme: (_event: Event) => void,
}

export const ThemeContext = createContext<ThemeInterface>({
    theme: { isChecked: false, type: 'light' },
    handleSettingTheme: () => {},
})
