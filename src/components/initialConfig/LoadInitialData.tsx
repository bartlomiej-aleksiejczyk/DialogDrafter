import {useEffect, useState} from "react";
import {SetInitialData} from "./SetInitialData";
import {defaultConfig} from "../../shared/config/defaultConfig";
import {getPathUntilLastSlash} from "./getPathUntilLastSlash";
import {GenericErrorHandler} from "../ErrorHandler/GenericErrorHandler";

export function LoadInitialData() {

    const [applicationConfig, setApplicationConfig] = useState<Record<string, any>>();
    const [workingDirectory, setWorkingDirectory] = useState<string>();
    const [userPlatform, setUserPlatform] = useState<string>();

    useEffect(() => {
        window.ipcRenderer.send('get-platform');
        window.ipcRenderer.on('send-platform', (event, platform) => {
            setUserPlatform(platform)
        });
        window.ipcRenderer.send("loadConfigFile", defaultConfig.SETTINGS_PATH);
        const handleFileData =  (_event, data) => {
            const parsedData = JSON.parse(data);
            setApplicationConfig(parsedData);
            setWorkingDirectory(getPathUntilLastSlash(parsedData["workingFile"]));

        };
        window.ipcRenderer.on("configData", handleFileData);
        // TODO: clean up removeListeners
        return () => {
            window.ipcRenderer.removeListener("configData", handleFileData);
            window.ipcRenderer.removeAllListeners('send-platform');
        };
    }, []);
    return (
        <>
            <GenericErrorHandler/>
            {(applicationConfig && workingDirectory) && <SetInitialData
                applicationConfig={applicationConfig}
                setApplicationConfig={setApplicationConfig}
                workingDirectory={workingDirectory}
                setWorkingDirectory={setWorkingDirectory}
                userPlatform={userPlatform as string}
            />}
        </>
    )
}