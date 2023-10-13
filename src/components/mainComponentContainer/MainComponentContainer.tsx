import { ChatLogBoxContainer } from "../chatLogBox/ChatLogBoxContainer";
import SideMenu from "../sideMenu/SideMenu";
import { TopNavbar } from "../topNavbar/TopNavbar";
import { useContext, useEffect, useRef, useState } from "react";
import { NewFileModal } from "../newFileModal/NewFileModal";
import { AddDirectoryModal } from "../addDirectoryModal/AddDirectoryModal";
import { defaultConfig } from "../../shared/config/defaultConfig";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { checkForSuccessToast } from "./checkForSuccessToast";

export function MainComponentContainer() {
	const [isNewFileModalVisible, setIsNewFileModalVisible] = useState<boolean>(false);
	const [isAddDirectoryModalVisible, setIsAddDirectoryModalVisible] = useState<boolean>(false);
	const { applicationConfig } = useContext(ApplicationConfigContext);
	const prevConfig = useRef(applicationConfig);

	useEffect(() => {
		window.ipcRenderer.send("save-config-file", applicationConfig, defaultConfig.SETTINGS_PATH);
		window.ipcRenderer.once("save-config-file-success", (event, data) => {
			checkForSuccessToast({ prevConfig, applicationConfig, data });
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
