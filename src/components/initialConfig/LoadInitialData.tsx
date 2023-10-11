import {useEffect, useState} from "react";
import {SetInitialData} from "./SetInitialData";
import {defaultConfig} from "../../shared/config/defaultConfig";
import {getPathUntilLastSlash} from "../../shared/utils/getPathUntilLastSlash";
import {GenericErrorHandler} from "../ErrorHandler/GenericErrorHandler";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";
import {validateConfig} from "../../shared/validators/validateConfig";

export function LoadInitialData() {
    // TODO: Add modal with information about config error and give user choice to exit app or create new config file
    const [applicationConfig, setApplicationConfig] = useState<Record<string, unknown>>();
    const [workingDirectory, setWorkingDirectory] = useState<string>();
    const [userPlatform, setUserPlatform] = useState<string>();

    useEffect(() => {
        window.ipcRenderer.send('get-platform');
        window.ipcRenderer.on('send-platform', (event, platform) => {
            setUserPlatform(platform)
        });
        window.ipcRenderer.send("load-config-file", defaultConfig.SETTINGS_PATH);
        const handleFileData = (_event, data) => {
            const parsedData = JSON.parse(data);
            setApplicationConfig(parsedData);
            console.log(typeof parsedData["working-file"])
            if (parsedData["working-file"]){
                setWorkingDirectory(getPathUntilLastSlash(parsedData["working-file"]));
            } else {
                setWorkingDirectory("")
            }
        };
        const handleConfigError = (_event, data) => {
            toast.custom(ErrorToast(data));
            const {newData} = validateConfig({data: {}})
            console.log(newData)
            window.ipcRenderer.send("save-config-file", newData, defaultConfig.SETTINGS_PATH);

            window.ipcRenderer.once("save-config-file-success", (_event, _data) => {
                //toast.custom(SuccessToast(data.message));
                setApplicationConfig(newData);
                setWorkingDirectory("");
            });
        };
        window.ipcRenderer.on("config-data", handleFileData);
        window.ipcRenderer.on("config-error", handleConfigError);
        return () => {
            window.ipcRenderer.removeAllListeners("config-error");
            window.ipcRenderer.removeAllListeners("send-platform");
        };
    }, []);
    return (
        <>
            <GenericErrorHandler/>
            {(applicationConfig !== undefined && workingDirectory !== undefined) && <SetInitialData
                applicationConfig={applicationConfig}
                setApplicationConfig={setApplicationConfig}
                workingDirectory={workingDirectory}
                setWorkingDirectory={setWorkingDirectory}
                userPlatform={userPlatform as string}
            />}
        </>
    )
}