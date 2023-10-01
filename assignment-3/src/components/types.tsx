export interface AppProps {
    isOpen?: boolean
    theme?: Partial<Theme>
}

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
    booksRef: React.MutableRefObject<Book[]>
    pagesRef: React.MutableRefObject<Book[][]>
    addBook: (_book: Book) => void
    removeBook: (_deletedBook: Book) => void
    setPages: (_pages: Book[][]) => void
    setCurrentPage: (_currentPage: Book[]) => void
    setActivePageNumber: (_activePageNumber: number) => void
    getPagination: (_booksArray: Book[]) => Book[][]
}

export interface ModalInterface {
    isOpen: boolean
    modalType: string | null
    currentBookIndex: number | null
    handleBookIndex: (_index: number) => void
    handleModalType: (_type: string) => void
    handleOpen: () => void
    handleClose: () => void
}
export interface Theme {
    isChecked: boolean
    type: 'light' | 'dark'
}

export type ChangeEventHandler<T> = (_event: React.ChangeEvent<T>) => void;

export interface ThemeInterface {
    theme: Theme
    handleSettingTheme: ChangeEventHandler<HTMLInputElement>
}
