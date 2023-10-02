import {useContext, useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {outputOnlyMdFiles} from "../sideMenu/outputOnlyMdFiles";
import {addMdExtension} from "../../shared/utils/addMdExtension";
import {joinPath} from "../../shared/utils/joinPath";
import {toast} from "react-hot-toast";
import {data} from "autoprefixer";
import {SuccessToast} from "../../shared/toasts/SuccessToast";

type NewFileInput = {
    fileName: string
}
const validFilenameRegex = /^[\w\-. ]+$/i
const maxFilenameLength = 200
// TODO: Add snackbar for file save
export function NewFileModal() {
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
        watch,
        formState: {errors},
        clearErrors,
    } = useForm<NewFileInput>()

    const onSubmit: SubmitHandler<NewFileInput> = (filename) => {
        const newFileFullPath = joinPath([selectedDirectory, addMdExtension(filename.fileName)], platform);
        window.ipcRenderer.send("saveWorkingFile", {}, newFileFullPath);
        window.ipcRenderer.once("saveWorkingFileSuccess", handleNewFileData);
        document.getElementById('newFileModal')?.close()
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
/*        toast(data.message,
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });*/
        toast.custom(SuccessToast);
    };
    const handleDirectoryData = (_event, data) => {
        const processedData = outputOnlyMdFiles(data);
        setDirectoryContent(processedData);
        setIsDirectoryContentLoaded(!!processedData);
    }

    useEffect(() => {

        window.ipcRenderer.send("loadFilenames", selectedDirectory);
        window.ipcRenderer.once("filenamesData", handleDirectoryData);
        return () => {
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
        <div className="pt-20 pl-112 pr-32 pt-32">
            <dialog id="newFileModal" className="modal">
                <div className="modal-box">

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
                               className="input input-bordered w-full max-w-xs"/>
                        {errors.fileName && (
                            <label className="label">
                                <span className="label-text-alt">
                                    <span className="text-warning">{errors.fileName.message}</span>
                                </span>
                            </label>
                        )}
                        <select className="select w-full max-w-xs"
                                onChange={handleDirectoryChange}
                        >
                            <option disabled>Pick your file destinantion</option>
                            {
                                Object.entries(applicationConfig["directories"]).map(([key, value ]) => (
                                        <option key={key} defaultValue={value === workingDirectory}>{key} [{value}]</option>
                                    )
                                )
                            }
                        </select>

                        <div className="modal-action">
                            <button className="btn" type="submit" disabled={!isDirectoryContentLoaded}>Submit</button>
                            <button className="btn" type="button"
                                    onClick={() => document.getElementById('newFileModal')?.close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}