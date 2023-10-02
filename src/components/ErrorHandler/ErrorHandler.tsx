import {useEffect} from "react";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";

export function ErrorHandler() {
    const handleNewFileData = (_event, data) => {
        toast(t => <ErrorToast {...t} message={data.message} />);    }
    useEffect(() => {
        window.ipcRenderer.on("error", handleNewFileData);
        return () => {
        };
    }, []);
}