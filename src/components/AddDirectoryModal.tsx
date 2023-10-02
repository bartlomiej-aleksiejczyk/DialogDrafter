import {useContext, useEffect, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import {ApplicationConfigContext} from "./initialConfig/ApplicationConfigContext";

type DirectoryInput = {
    directoryName: string;
};

export function AddDirectoryModal() {
    const { applicationConfig, setApplicationConfig } = useContext(ApplicationConfigContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DirectoryInput>();

    const [selectedDirectory, setSelectedDirectory] = useState<string>("");

    const onSubmit: SubmitHandler<DirectoryInput> = (data) => {
        // Logic to handle directory addition
    };

    const openDirectoryPicker = () => {
        window.ipcRenderer.send("open-directory-picker");
    };

    const handleDirectoryPicked = (_event: any, path: string) => {
        console.log("Selected Directory:", path);
        setSelectedDirectory(path);
    };

    useEffect(() => {
        window.ipcRenderer.on("directory-picked", handleDirectoryPicked);
        return () => {
            window.ipcRenderer.removeListener("directory-picked", handleDirectoryPicked);
        };
    }, []);

    return (
        <div className="p-8">
            <dialog id="addDirectoryModal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("directoryName", {
                                required: "Directory name is required.",
                            })}
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Directory name"
                        />
                        {errors.directoryName && (
                            <label className="label">
                <span className="label-text-alt">
                  <span className="text-warning">{errors.directoryName.message}</span>
                </span>
                            </label>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary mt-4"
                            onClick={openDirectoryPicker}
                        >
                            Select Directory
                        </button>

                        <p className="mt-4">
                            Selected Directory: <strong>{selectedDirectory}</strong>
                        </p>

                        <div className="modal-action mt-4">
                            <button className="btn" type="submit">
                                Add Directory
                            </button>
                            <button
                                className="btn"
                                type="button"
                                onClick={() => document.getElementById("addDirectoryModal")?.close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
