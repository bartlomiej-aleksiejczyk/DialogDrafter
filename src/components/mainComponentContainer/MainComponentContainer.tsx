import { ChatLogBoxContainer } from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import { TopNavbar } from "../topNavbar/TopNavbar";
import { useContext, useEffect, useRef, useState } from "react";
import { NewFileModal } from "../newFileModal/NewFileModal";
import { AddDirectoryModal } from "../addDirectoryModal/AddDirectoryModal";
import { defaultConfig } from "../../shared/config/defaultConfig";

import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { toast } from "react-hot-toast";
import { SuccessToast } from "../../shared/toasts/SuccessToast";
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

	// TODO: Extract modals to one method

	// TODO: Fix vanishing scrollbar when modal
	const [isNewFileModalVisible, setIsNewFileModalVisible] = useState<boolean>(false);
	const [isAddDirectoryModalVisible, setIsAddDirectoryModalVisible] = useState<boolean>(false);
	const { applicationConfig } = useContext(ApplicationConfigContext);
	const prevConfig = useRef(applicationConfig);

	useEffect(() => {
		window.ipcRenderer.send("save-config-file", applicationConfig, defaultConfig.SETTINGS_PATH);
		window.ipcRenderer.once('"save-config-file-success"', (event, data) => {
			const {
				directories: oldDirectories,
				workingFile: oldWorkingFile,
				...oldConfig
			} = prevConfig.current;
			const {
				directories: newDirectories,
				workingFile: newWorkingFile,
				...newConfig
			} = applicationConfig;

			if (!_.isEqual(oldConfig, newConfig) || oldDirectories !== newDirectories) {
				toast.custom(SuccessToast(data.message));
			}
			prevConfig.current = applicationConfig;
		});
	}, [applicationConfig]);
	return (
		<div className="flex flex-col">
			<TopNavbar
				setIsAddDirectoryModalVisible={setIsAddDirectoryModalVisible}
				setIsNewFileModalVisible={setIsNewFileModalVisible}
			/>
			<div className="flex flex-row">
				<SideMenu />
				<ChatLogBoxContainer />
			</div>
			{isNewFileModalVisible && <NewFileModal setIsModalVisible={setIsNewFileModalVisible} />}
			{isAddDirectoryModalVisible && (
				<AddDirectoryModal setIsModalVisible={setIsAddDirectoryModalVisible} />
			)}
		</div>
	);
}
