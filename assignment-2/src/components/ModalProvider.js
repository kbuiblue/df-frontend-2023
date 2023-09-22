import { useState } from "react";
import { ModalContext } from "./context";

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentBookIndex, setCurrentBookIndex] = useState(null);
    const [type, setType] = useState(null);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleType = (newType) => {
        setType(newType);
    };

    const handleBookIndex = (index) => {
        setCurrentBookIndex(index)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                type,
                currentBookIndex,
                handleType,
                handleBookIndex,
                handleOpen,
                handleClose,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
