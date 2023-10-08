import { toast } from "react-hot-toast";
import { SuccessToast } from "../../shared/toasts/SuccessToast";

export const useFileManagement = (applicationConfig, setApplicationConfig) => {
    const handleNewFileData = (_event, data) => {
        console.log(data);
        setApplicationConfig({
            ...applicationConfig,
            "workingFile": data.newFilePath
        });
        toast.custom(SuccessToast(data.message));
    };

    const createNewFile = (filePath) => {
        window.ipcRenderer.send("saveWorkingFile", "", filePath);
        window.ipcRenderer.once("saveWorkingFileSuccess", handleNewFileData);
    };
    return { createNewFile };
};
