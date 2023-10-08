import {useEffect} from "react";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";

export function ErrorHandler() {
    const handleNewFileData = (_event, data) => {
        console.log(`error` + data)
        toast.custom(ErrorToast(data.message));
    }
    useEffect(() => {
        window.ipcRenderer.on("error", handleNewFileData);
        return () => {
            window.ipcRenderer.removeAllListeners("error")
        };
    }, []);
}