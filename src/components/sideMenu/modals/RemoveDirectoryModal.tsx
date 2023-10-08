import React, {useContext} from 'react';
import {handleDirectoryRemove} from "./handleDirectoryRemove";
import {ApplicationConfigContext} from "../../initialConfig/ApplicationConfigContext";
import {GenericModalProps} from "../../../shared/interfaces/GenericModalProps";

interface RemoveDirectoryModalProps extends GenericModalProps {
    directoryToRemove: string
}
// TODO: Remove working file config when manipulating

export const RemoveDirectoryModal = ({directoryToRemove, isModalVisible, setIsModalVisible}: RemoveDirectoryModalProps) => {
    const {applicationConfig, setApplicationConfig} = useContext(ApplicationConfigContext)

    const handleConfirm = async () => {
        setIsModalVisible(false);
        handleDirectoryRemove(directoryToRemove, applicationConfig, setApplicationConfig);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {isModalVisible && (
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