import { useState } from 'react';

export const useModal = (openDefault = false) => {
    const [isOpen, setIsOpen] = useState(openDefault);

    const open = () => {
        setIsOpen(true);
    }
    const close = () => {
        setIsOpen(false);
    }

    return [isOpen,open,close];
}