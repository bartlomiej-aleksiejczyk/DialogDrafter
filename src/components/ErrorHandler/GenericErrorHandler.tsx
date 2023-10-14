import {useEffect} from "react";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";

export function GenericErrorHandler() {
    const handleNewFileData = (_event, data) => {
        console.error(data)
        toast.custom(ErrorToast(data));
    }
    useEffect(() => {
        window.ipcRenderer.on("error", handleNewFileData);
        return () => {
            window.ipcRenderer.removeAllListeners("error")
        };
    }, []);
}