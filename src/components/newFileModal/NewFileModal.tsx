import {useContext, useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {outputOnlyMdFiles} from "../sideMenu/outputOnlyMdFiles";
import {addMdExtension} from "../../shared/utils/addMdExtension";
import {joinPath} from "../../shared/utils/joinPath";
import {toast} from "react-hot-toast";
import {SuccessToast} from "../../shared/toasts/SuccessToast";
import {maxFilenameLength, validFilenameRegex} from "../../shared/validators/validators";
import {GenericModalProps} from "../../shared/interfaces/GenericModalProps";

type NewFileInput = {
    fileName: string
}

// TODO: Rename methods to make things more logical

export function NewFileModal({isModalVisible, setIsModalVisible}: GenericModalProps) {
    const {
        platform,
        applicationConfig,
        setApplicationConfig,
        workingDirectory,
    } = useContext(ApplicationConfigContext)
    const [selectedDirectory, setSelectedDirectory] = useState<string>(workingDirectory);
    const [directoryContent, setDirectoryContent] = useState<string[]>([]);
    const [isDirectoryContentLoaded, setIsDirectoryContentLoaded] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        clearErrors,
    } = useForm<NewFileInput>()

    const onSubmit: SubmitHandler<NewFileInput> = (filename) => {
        const newFileFullPath = joinPath([selectedDirectory, addMdExtension(filename.fileName)], platform);
        window.ipcRenderer.send("saveWorkingFile", "", newFileFullPath);
        window.ipcRenderer.once("saveWorkingFileSuccess", handleNewFileData);
        setIsModalVisible(false)
    }

    const isFilenameAvailable = (filename: string) => !directoryContent.includes(addMdExtension(filename));

    const handleDirectoryChange = (event) => {
        clearErrors("fileName");
        setIsDirectoryContentLoaded(false);
        setSelectedDirectory(event.target.value);
    }
    const handleNewFileData = (_event, data) => {
        console.log(data)
        setApplicationConfig({
            ...applicationConfig,
            "workingFile": data.newFilePath
        })
        toast.custom(SuccessToast(data.message));
    };
    const handleDirectoryData = (_event, data) => {
        const processedData = outputOnlyMdFiles(data);
        setDirectoryContent(processedData);
        setIsDirectoryContentLoaded(!!processedData);
    }

    useEffect(() => {

        window.ipcRenderer.send("loadFilenames", selectedDirectory);
        window.ipcRenderer.on("filenamesData", handleDirectoryData);
        return () => {
            window.ipcRenderer.off("filenamesData", handleDirectoryData);
            console.log(window.ipcRenderer.listeners("filenamesData"))
        };
    }, [selectedDirectory]);

    const errorMessages = {
        required: "Filename is required.",
        pattern: "Filename can only contain alphanumeric characters, hyphens, underscores, periods, and spaces.",
        maxLength: `Filename must be shorter than ${maxFilenameLength} characters.`,
        isFilenameAvailable: "Filename already exists. Choose a different name."
    };
// TODO: Handle I/O save error when saving file
    return (
        isModalVisible &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overscroll-contain">
            <div className="pt-20 pl-112 pr-32 pt-32">
                <div className="modal-box">
                    <p className="text-2xl mt-2">Create New Chat</p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input {...register("fileName", {
                            required: errorMessages.required,
                            pattern: {value: validFilenameRegex, message: errorMessages.pattern},
                            maxLength: {value: maxFilenameLength, message: errorMessages.maxLength},
                            validate: {
                                isFilenameAvailable: (value) => {
                                    return isFilenameAvailable(value) || errorMessages.isFilenameAvailable;
                                }
                            },

                        })}
                               className="input input-bordered w-full max-w-xs mt-5"/>
                        {errors.fileName && (
                            <label className="label">
                                <span className="label-text-alt">
                                    <span className="text-warning">{errors.fileName.message}</span>
                                </span>
                            </label>
                        )}
                        <select className="select w-full max-w-xs mt-2"
                                onChange={handleDirectoryChange}
                                value={selectedDirectory}
                        >
                            <option disabled>Pick your file destinantion</option>
                            {
                                Object.entries(applicationConfig["directories"]).map(([key, value]) => (
                                        <option key={key} value={value as string}>{key} [{value}]</option>
                                    )
                                )
                            }
                        </select>

                        <div className="modal-action">
                            <button className="btn" type="submit" disabled={!isDirectoryContentLoaded}>Submit</button>
                            <button className="btn" type="button"
                                    onClick={() => setIsModalVisible(false)}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
        ;
}