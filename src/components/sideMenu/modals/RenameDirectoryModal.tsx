import React, {useContext} from 'react';
import {handleDirectoryRemove} from "./handleDirectoryRemove";
import {ApplicationConfigContext} from "../../initialConfig/ApplicationConfigContext";
import {SubmitHandler, useForm} from "react-hook-form";
import {errorMessages} from "../../addDirectoryModal/errorMessages";
import {maxFilenameLength, validFilenameRegex} from "../../../shared/validators/validators";

type RenameDirectoryModalProps = {
    directoryToRemove: string
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
};
type RenameInput = {
    newName: string;
};
export const RenameDirectoryModal = ({directoryToRemove, isVisible, setIsVisible }: RenameDirectoryModalProps) => {
    const {applicationConfig, setApplicationConfig} = useContext(ApplicationConfigContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RenameInput>();
    const directories = applicationConfig["directories"]
    const isDirectoryNameAvailable = (directoryName: string) => !Object.keys(directories).includes(directoryName);

    const handleConfirm = () => {
        setIsVisible(false);
        handl(directoryToRemove, applicationConfig, setApplicationConfig);
    };

    const handleClose = () => {
        setIsVisible(false);
    };
    const onSubmit: SubmitHandler<RenameInput> = (data) => {
        console.log(data)
        const newDirectories = {...directories, [data.directoryName]: getValues("selectedDirectory")}
        setApplicationConfig({
            ...applicationConfig,
            "directories": newDirectories
        })
        document.getElementById('addDirectoryModal')?.close()
    };
    return (
        <>
            {isVisible && (
                <dialog className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">{"MESSAGE_TEXT_TODO"}</p>
                        <input
                            {...register("directoryName", {
                                required: errorMessages.directoryName.required,
                                pattern: {
                                    value: validFilenameRegex,
                                    message: errorMessages.directoryName.pattern
                                },
                                maxLength: {
                                    value: maxFilenameLength,
                                    message: errorMessages.directoryName.maxLength
                                },
                                validate: {
                                    isNameAvailable: value =>
                                        isDirectoryNameAvailable(value) || errorMessages.directoryName.isNameAvailable
                                }
                            })}
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Directory name"
                        />
                        {errors.newName && (
                            <label className="label">
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