import React, {useContext} from 'react';
import {ApplicationConfigContext} from "../../initialConfig/ApplicationConfigContext";
import {SubmitHandler, useForm} from "react-hook-form";
import {errorMessages} from "../../addDirectoryModal/errorMessages";
import {maxFilenameLength, validFilenameRegex} from "../../../shared/validators/validators";
import {GenericModalProps} from "../../../shared/interfaces/GenericModalProps";
import {handleDirectoryRename} from "./handleDirectoryRename";

interface RenameDirectoryModalProps extends GenericModalProps {
    directoryToRename: string
}

type RenameInput = {
    newName: string;
};
// TODO: Rename working file config when manipulating

export const RenameDirectoryModal = ({directoryToRename, isVisible, setIsVisible}: RenameDirectoryModalProps) => {
    const {applicationConfig, setApplicationConfig} = useContext(ApplicationConfigContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RenameInput>();
    const directories = applicationConfig["directories"]
    const isDirectoryNameAvailable = (directoryName: string) => !Object.keys(directories).includes(directoryName);

    const handleClose = () => {
        setIsVisible(false);
    };
    const onSubmit: SubmitHandler<RenameInput> = (data) => {
        console.log(data)
        handleDirectoryRename(directoryToRename, data.newName, applicationConfig, setApplicationConfig)
        setIsVisible(false)
    };
    return (
        isVisible &&
        <>
            <dialog className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">{"MESSAGE_TEXT_TODO"}</p>
                        <input
                            {...register("newName", {
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
                            placeholder={directoryToRename}
                        />
                        {errors.newName &&
                            <label className="label"> {errors.newName.message} </label>}
                        <div className="modal-action">
                            <button className="btn" type="submit">Rename</button>
                            <button className="btn" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}