import {ApplicationConfigContext} from "./ApplicationConfigContext";
import {ChatLogBoxContainer} from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import {TopNavbar} from "../topNavbar/TopNavbar";import {Dispatch, SetStateAction} from "react";
import {NewFileModal} from "../newFileModal/newFileModal";

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
    return (
        <ApplicationConfigContext.Provider
            value={{
                applicationConfig,
                setApplicationConfig,
                workingDirectory,
                setWorkingDirectory,
                userPlatform}}>
            <div className="flex flex-col">
                <TopNavbar />
                <div className="flex flex-row">
                    <SideMenu />
                    <ChatLogBoxContainer/>
                </div>
                <NewFileModal/>
            </div>
        </ApplicationConfigContext.Provider>
    )
}