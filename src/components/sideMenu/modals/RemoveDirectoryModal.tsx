import React from 'react';

type RemoveDirectoryModalProps = {
    directoryToRemove: string
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
};

export const RemoveDirectoryModal = ({directoryToRemove, isVisible, setIsVisible }: RemoveDirectoryModalProps) => {

    const handleConfirm = () => {
        setIsVisible(false);
        //onConfirm();
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <dialog className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">{"MESSAGE_TEXT_TODO"}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={handleConfirm}>Confirm</button>
                            <button className="btn" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};