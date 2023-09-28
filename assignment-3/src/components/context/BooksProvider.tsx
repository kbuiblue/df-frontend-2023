import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react'
import { BooksContext, Book } from './context'

interface BooksProviderProps {
    children: ReactNode
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
    const defaultBooks = [
        {
            id: '0',
            name: 'Design Patterns: Elements of Reusable Object-Oriented Software',
            author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, Grady Booch (Foreword)',
            topic: 'Design patterns',
        },
        {
            id: '1',
            name: 'The Pragmatic Programmer: From Journeyman to Master',
            author: 'Andrew Hunt, David Thomas',
            topic: 'Computer programming',
        },
        {
            id: '2',
            name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            author: 'Robert Cecil Martin',
            topic: 'Software design',
        },
        {
            id: '3',
            name: 'Cracking the Coding Interview',
            author: 'Gayle Laakmann McDowell',
            topic: 'Coding interview',
        },
        {
            id: '4',
            name: 'Refactoring: Improving the Design of Existing Code',
            author: 'Martin Fowler',
            topic: 'Code refactoring',
        },
    ]

    const PAGINATION_LIMIT = 5

    const getPagination = useCallback((booksArray: Book[]) => {
        const pages: Book[][] = []

        for (let i = 0; i < booksArray.length; i += PAGINATION_LIMIT) {
            const page = booksArray.slice(i, i + PAGINATION_LIMIT)
            pages.push(page)
        }
        return pages
    }, [])

    const storedBooks: Book[] | null = JSON.parse(
        localStorage.getItem('books') ?? 'null',
    )
    const [books, setBooks] = useState<Book[]>(storedBooks || defaultBooks)
    const [pages, setPages] = useState(getPagination(books))
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [activePageNumber, setActivePageNumber] = useState(1)
    const booksParam: Book[] | null = storedBooks || null

    useEffect(() => {
        const newPages = getPagination(booksParam || books)

        setPages(newPages)
        setCurrentPage(newPages[activePageNumber - 1])

        localStorage.setItem('books', JSON.stringify(books))
    }, [books, booksParam, activePageNumber, getPagination])

    const addBook = useCallback(
        (book : Book) => {
            setBooks([...books, book])
        },
        [books],
    )

    const removeBook = useCallback(
        (deletedBook : Book) => {
            const remainingBooks = books.filter(
                (book) => book.id !== deletedBook.id,
            )
            setBooks([...remainingBooks])

            if (currentPage.length === 1 && activePageNumber > 1) {
                setActivePageNumber(activePageNumber - 1)
            }
        },
        [books, currentPage, activePageNumber],
    )

    const value = useMemo(
        () => ({
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
        }),
        [
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
        ],
    )

    return (
        <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
    )
}
