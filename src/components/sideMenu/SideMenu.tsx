import React, { useContext, useEffect, useRef, useState } from "react";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { outputOnlyMdFiles } from "./outputOnlyMdFiles";
import { DropdownPortal } from "./dropdownPortal/DropdownPortal";
import { handleButtonClick } from "./dropdownPortal/handleButtonClick";
import { RemoveDirectoryModal } from "../removeDirectoryModal/RemoveDirectoryModal";
import { RenameDirectoryModal } from "../renameDirectoryModal/RenameDirectoryModal";
import { isString } from "../../shared/utils/isString";
import { DirectoryItem } from "./DirectoryItem";
import { DropdownContent } from "./dropdownPortal/DropdownContent";

const MODALS = {
	REMOVE: "REMOVE",
	RENAME: "RENAME",
};

function SideMenu() {
	const { applicationConfig, workingDirectory, setWorkingDirectory } =
		useContext(ApplicationConfigContext);
	const directoryToChange = useRef<string | null>(null);
	const [directoryContent, setDirectoryContent] = useState<string[]>([]);
	const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
	const [visibleModal, setVisibleModal] = useState<string | null>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const handleModalOpen = (modalType: string) => {
		directoryToChange.current = visibleDropdown;
		setVisibleDropdown(null);
		setVisibleModal(modalType);
	};

	const handleModalClose = () => setVisibleModal(null);

	const modals = {
		[MODALS.REMOVE]: visibleModal === MODALS.REMOVE && isString(directoryToChange.current) && (
			<RemoveDirectoryModal
				directoryToRemove={directoryToChange.current}
				setIsModalVisible={handleModalClose}
			/>
		),
		[MODALS.RENAME]: visibleModal === MODALS.RENAME && isString(directoryToChange.current) && (
			<RenameDirectoryModal
				setIsModalVisible={handleModalClose}
				directoryToRename={directoryToChange.current}
			/>
		),
	};
	const availableDirectories: Record<string, string> = applicationConfig["directories"];
	const handleFileData = (_event, data) => {
		setDirectoryContent(outputOnlyMdFiles(data));
	};

	useEffect(() => {
		setDirectoryContent([]);
		if (!workingDirectory) return;
		window.ipcRenderer.send("load-filenames", workingDirectory);
		window.ipcRenderer.once("filenames-data", handleFileData);
	}, [workingDirectory, applicationConfig]);
	const handleSelectDirectory = (directoryPath) => {
		setWorkingDirectory(directoryPath);
	};

	return (
		<div className="fixed left-0 top-0 inline h-screen overflow-hidden bg-base-200 pt-16 text-base-content ">
			<ul
				className={`menu max-h-[calc(100vh-4rem)] w-80  flex-nowrap p-4 ${
					visibleDropdown ? "overflow-hidden" : "overflow-y-auto"
				}`}
			>
				{Object.entries(availableDirectories).map(([key, value]) => {
					return (
						<div key={key} className="flex">
							<DirectoryItem
								directoryName={key}
								directoryPath={value}
								directoryContent={directoryContent}
								isSelected={workingDirectory === value}
								onDirectoryClick={() => handleSelectDirectory(value)}
							/>
							<button
								onClick={(e) =>
									handleButtonClick(e, key, setPosition, setVisibleDropdown)
								}
								className={`btn btn-square btn-sm ml-2 mt-2.5 ${
									visibleDropdown === key && "btn-active"
								}`}
							>
								<svg
									className="h-5 w-5 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 4 15"
								>
									<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
								</svg>
							</button>
							{visibleDropdown === key && (
								<DropdownPortal position={position}>
									<DropdownContent
										onRenameClick={(e) => {
											e.stopPropagation();
											handleModalOpen("RENAME");
										}}
										onRemoveClick={(e) => {
											e.stopPropagation();
											handleModalOpen("REMOVE");
										}}
									/>
								</DropdownPortal>
							)}
						</div>
					);
				})}
				{modals[MODALS.REMOVE]}
				{modals[MODALS.RENAME]}
			</ul>
		</div>
	);
}

export default SideMenu;
