import { toast } from "react-hot-toast";
import { SuccessToast } from "../../shared/toasts/SuccessToast";

export const useFileManagement = (applicationConfig, setApplicationConfig) => {
    const handleNewFileData = (_event, data) => {
        console.log(data);
        setApplicationConfig({
            ...applicationConfig,
            "working-file": data.newFilePath
        });
        toast.custom(SuccessToast(data.message));
    };

    const createNewFile = (filePath) => {
        window.ipcRenderer.send("save-working-file", "", filePath);
        window.ipcRenderer.once("save-working-file-success", handleNewFileData);
    };
    return { createNewFile };
};
