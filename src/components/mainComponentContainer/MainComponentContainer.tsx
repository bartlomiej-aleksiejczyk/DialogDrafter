import {ChatLogBoxContainer} from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import {TopNavbar} from "../topNavbar/TopNavbar";
import {useContext, useEffect, useRef, useState} from "react";
import {NewFileModal} from "../newFileModal/NewFileModal";
import {AddDirectoryModal} from "../addDirectoryModal/AddDirectoryModal";
import {defaultConfig} from "../../shared/config/defaultConfig";

import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {toast} from "react-hot-toast";
import {SuccessToast} from "../../shared/toasts/SuccessToast";
import _ from "lodash";

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
    const [isNewFileModalVisible, setIsNewFileModalVisible] = useState<boolean>(false);
    const [isAddDirectoryModalVisible, setIsAddDirectoryModalVisible] = useState<boolean>(false);
    const {
        applicationConfig,
    } = useContext(ApplicationConfigContext)
    const prevConfig = useRef(applicationConfig);

    useEffect(() => {
        console.log(applicationConfig)
        window.ipcRenderer.send("saveConfigFile", applicationConfig, defaultConfig.SETTINGS_PATH);
        window.ipcRenderer.once('saveConfigFileSuccess', (event, data) => {
            console.log(data.message);
            const {directories: oldDirectories, workingFile: oldWorkingFile, ...oldConfig} = prevConfig.current;
            const {directories: newDirectories, workingFile: newWorkingFile, ...newConfig} = applicationConfig;

            if ((!_.isEqual(oldConfig, newConfig)) || (oldDirectories !== newDirectories)) {
                toast.custom(SuccessToast(data.message));
            }
            prevConfig.current = applicationConfig;
        });
        return () => {
        };
    }, [applicationConfig]);
    return (
        <div className="flex flex-col">
            <TopNavbar setIsAddDirectoryModalVisible={setIsAddDirectoryModalVisible}
                       setIsNewFileModalVisible={setIsNewFileModalVisible}/>
            <div className="flex flex-row">
                <SideMenu/>
                <ChatLogBoxContainer/>
            </div>
            <NewFileModal isModalVisible={isNewFileModalVisible} setIsModalVisible={setIsNewFileModalVisible}/>
            <AddDirectoryModal isModalVisible={isAddDirectoryModalVisible}
                               setIsModalVisible={setIsAddDirectoryModalVisible}/>
        </div>
    )
}