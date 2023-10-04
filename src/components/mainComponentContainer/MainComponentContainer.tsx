import {ChatLogBoxContainer} from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import {TopNavbar} from "../topNavbar/TopNavbar";import {useContext, useEffect} from "react";
import {NewFileModal} from "../newFileModal/NewFileModal";
import {AddDirectoryModal} from "../addDirectoryModal/AddDirectoryModal";
import {defaultConfig} from "../../shared/config/defaultConfig";

import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {toast} from "react-hot-toast";
import {SuccessToast} from "../../shared/toasts/SuccessToast";

export function MainComponentContainer() {
    //TODO: Add handling for specific changes in config. For example "Added new directory" instead of "Config successfully changed"

    // TODO: Check if transition App -> LoadInitialData -> SetInitialData -> [TopNavbar, SideMenu, ChatLogBoxContainer] is good idea

    //TODO: Handle if directory path is wrong
    // TODO: Handle if file is not set
    // TODO: Check if working directory is available
    // TODO: Check if working directory is in directory list
    // TODO: Check if working file is available
    // TODO: Check if working file is in working directory
    // TODO: Error handling for I/O errors
    // TODO: Examine accessing object key as string e.g., "object["key"]"

    const {
        applicationConfig,
    } = useContext(ApplicationConfigContext)
    useEffect(() => {
        window.ipcRenderer.send("saveConfigFile", applicationConfig, defaultConfig.SETTINGS_PATH);
        window.ipcRenderer.on('saveConfigFileSuccess', (event, data) => {
            console.log(data.message);
            toast.custom(SuccessToast(data.message));
        });
        return () => {
        };
    }, [applicationConfig]);
    return (
            <div className="flex flex-col">
                <TopNavbar />
                <div className="flex flex-row">
                    <SideMenu />
                    <ChatLogBoxContainer/>
                </div>
                <NewFileModal/>
                <AddDirectoryModal/>
            </div>
    )
}