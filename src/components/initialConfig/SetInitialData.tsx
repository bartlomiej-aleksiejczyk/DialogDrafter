import {ApplicationConfigContext} from "./ApplicationConfigContext";
import {Dispatch, SetStateAction} from "react";
import {MainComponentContainer} from "../mainComponentContainer/MainComponentContainer";
import {validateInitialData} from "./validateInitialData";

interface SetInitialDataProps {
    applicationConfig: Record<string, string>;
    setApplicationConfig: Dispatch<SetStateAction<Record<string, string>>>;
    workingDirectory: string;
    setWorkingDirectory: Dispatch<SetStateAction<string>>;
    userPlatform: string;
}
export function SetInitialData({
        applicationConfig,
        setApplicationConfig,
        workingDirectory,
        setWorkingDirectory,
        userPlatform}: SetInitialDataProps) {
    // TODO: use "electron-store" and "Ajv JSON schema validator" instead of custom solution, if something is not right display info about broken config file
    // TODO: add option to restore/add default config in case of broken file
    validateInitialData(applicationConfig, setApplicationConfig)
    return (
        <ApplicationConfigContext.Provider
            value={{
                applicationConfig,
                setApplicationConfig,
                workingDirectory,
                setWorkingDirectory,
                userPlatform}}>
            <MainComponentContainer/>
        </ApplicationConfigContext.Provider>
    )
}