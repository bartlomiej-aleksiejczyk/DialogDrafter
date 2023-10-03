import {ChatLogBoxContainer} from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import {TopNavbar} from "../topNavbar/TopNavbar";import {useContext, useEffect} from "react";
import {NewFileModal} from "../newFileModal/NewFileModal";
import {AddDirectoryModal} from "../addDirectoryModal/AddDirectoryModal";
import {defaultConfig} from "../../shared/config/defaultConfig";

import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";

export function MainComponentContainer() {
    //TODO: Add handling for specific changes in config. For example "Added new directory" instead of "Config successfully changed"
    const {
        applicationConfig,
    } = useContext(ApplicationConfigContext)
    useEffect(() => {
        window.ipcRenderer.send("saveConfigFile", applicationConfig, defaultConfig.SETTINGS_PATH);
        window.ipcRenderer.on('saveConfigFileSuccess', (event, data) => {
            console.log(data.message);
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