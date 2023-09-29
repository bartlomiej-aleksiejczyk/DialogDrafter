import {useEffect, useState} from "react";
import {SetInitialData} from "./SetInitialData";
import {defaultConfig} from "../../config/defaultConfig";

export function LoadInitialData() {
    const [applicationConfig, setApplicationConfig] = useState();
    useEffect(() => {
        window.ipcRenderer.send("loadConfigFile", defaultConfig.SETTINGS_PATH);
        const handleFileData = (_event, data) => {
            setApplicationConfig(JSON.parse(data));
        };
        window.ipcRenderer.on("configData", handleFileData);
        return () => {
            window.ipcRenderer.removeListener("configData", handleFileData);
        };
    }, []);
    return (
        <>
            {applicationConfig && <SetInitialData applicationConfig={applicationConfig}/>}
        </>
    )
}