import React, {useContext} from 'react';
import {handleDirectoryRemove} from "./handleDirectoryRemove";
import {ApplicationConfigContext} from "../../initialConfig/ApplicationConfigContext";

type RemoveDirectoryModalProps = {
    directoryToRemove: string
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
};

export const RemoveDirectoryModal = ({directoryToRemove, isVisible, setIsVisible }: RemoveDirectoryModalProps) => {
    const {applicationConfig, setApplicationConfig} = useContext(ApplicationConfigContext)

    const handleConfirm = () => {
        setIsVisible(false);
        handleDirectoryRemove(directoryToRemove, applicationConfig, setApplicationConfig);
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