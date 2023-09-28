import { useState, useMemo, ReactNode, useCallback } from 'react'
import { ModalContext } from './context'

interface ModalProviderProps {
    children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentBookIndex, setCurrentBookIndex] = useState(null)
    const [modalType, setModalType] = useState(null)

    const handleOpen = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleModalType = useCallback((type) => {
        setModalType(type)
    }, [])

    const handleBookIndex = useCallback((index) => {
        setCurrentBookIndex(index)
    }, [])

    const value = useMemo(
        () => ({
            isOpen,
            modalType,
            currentBookIndex,
            handleModalType,
            handleBookIndex,
            handleOpen,
            handleClose,
        }),
        [
            isOpen,
            modalType,
            currentBookIndex,
            handleModalType,
            handleBookIndex,
            handleOpen,
            handleClose,
        ],
    )

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}
