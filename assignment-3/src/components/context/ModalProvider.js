import { useState } from "react";
import { ModalContext } from "./context";

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentBookIndex, setCurrentBookIndex] = useState(null);
    const [modalType, setModalType] = useState(null);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleModalType = (newModalType) => {
        setModalType(newModalType);
    };

    const handleBookIndex = (index) => {
        setCurrentBookIndex(index)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                modalType,
                currentBookIndex,
                handleModalType,
                handleBookIndex,
                handleOpen,
                handleClose,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
