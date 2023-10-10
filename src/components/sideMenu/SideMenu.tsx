import React, {useContext, useEffect, useRef, useState} from "react";
import {SideMenuItem} from "./SideMenuItem";
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {outputOnlyMdFiles} from "./outputOnlyMdFiles";
import {ContextMenu, ContextMenuBody} from "./contextMenu/ContextMenuBody";
import {handleRightClick} from "./contextMenu/handleRightClick";
import {handleRemove} from "./contextMenu/handleRemove";
import {handleRename} from "./contextMenu/handleRename";
import {DropdownPortal} from "./dropdownPortal/DropdownPortal";
import {handleButtonClick} from "./dropdownPortal/handleButtonClick";
import {RemoveDirectoryModal} from "./modals/RemoveDirectoryModal";
import {RenameDirectoryModal} from "./modals/RenameDirectoryModal";


function SideMenu() {
    // TODO: Add remove/rename file feature
    const directoryToChange = useRef<string | null>(null);
    const [directoryContent, setDirectoryContent] = useState<string[]>([]);
    const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);

    const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);

    const [contextMenu, setContextMenu] = useState<ContextMenu>({
        x: 0,
        y: 0,
        isVisible: false,
        directoryKey: ''
    });
    const [position, setPosition] = useState({x: 0, y: 0});
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const {applicationConfig, workingDirectory, setWorkingDirectory} = useContext(ApplicationConfigContext)
    const availableDirectories = applicationConfig["directories"]
    const handleFileData = (_event, data) => {
        setDirectoryContent(outputOnlyMdFiles(data));
    };

    useEffect(() => {
        const handleGlobalClick = (e) => {
        };
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [visibleDropdown]);

    useEffect(() => {
        // TODO: Check why  this useeffect triggers two times
        setDirectoryContent([])
        if (!workingDirectory) return
        console.log("Effect running due to changes in: ", workingDirectory, applicationConfig);
        window.ipcRenderer.send("load-filenames", workingDirectory);
        window.ipcRenderer.once("filenames-data", handleFileData);
        return () => {
        };
    }, [workingDirectory, applicationConfig]);
    const handleSelectDirectory = (directoryPath) => {
        setWorkingDirectory(directoryPath)
    };

    const handleClickOnRemoveDirectory = () => {
        directoryToChange.current = visibleDropdown as string;
        console.log(isRemoveModalVisible)
        setVisibleDropdown(null)
        setIsRemoveModalVisible(true)
    }
    const handleClickOnRenameDirectory = () => {
        directoryToChange.current = visibleDropdown as string;
        console.log(isRemoveModalVisible)
        setVisibleDropdown(null)
        setIsRenameModalVisible(true)
    }

    return (
        <div className="inline fixed top-0 left-0 h-screen bg-base-200 text-base-content pt-16 overflow-hidden ">
            <ul className={`menu p-4 w-80  max-h-[calc(100vh-4rem)] flex-nowrap ${visibleDropdown ? "overflow-hidden" : "overflow-y-auto"}`}>
                {Object.entries(availableDirectories).map(([key, value]) => {
                    return (
                        <div key={key} className="flex">
                            <li key={key} className="pt-2 pb-2  flex w-60 "
                                onClick={() => handleSelectDirectory(value)}
                            >
                                {(workingDirectory === value) ?
                                    <>
                                        <a className="active w-60 inline"
                                           onContextMenu={(e) => handleRightClick(e, key, setContextMenu)}
                                        >{key}</a>
                                        <ul className={`menu-dropdown menu-dropdown-show`}>
                                            {directoryContent.map(item => (
                                                <SideMenuItem key={item} fileName={item} directory={value as string}/>
                                            ))}
                                        </ul>
                                    </>
                                    : <a className="w-60">{key}</a>
                                }
                            </li>
                            <button onClick={(e) => handleButtonClick(e, key, setPosition, setVisibleDropdown)}
                                    ref={buttonRef}
                                    className={`btn btn-sm btn-square ml-2 mt-2.5 ${visibleDropdown === key && "btn-active"}`}>
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                    <path
                                        d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                            </button>
                            {visibleDropdown === key && (
                                <DropdownPortal position={position}>
                                    <ul tabIndex={0}
                                        className="dropdown-content mt-1 p-2 shadow menu shadow bg-base-100 rounded-box w-52"
                                        ref={dropdownRef}>
                                        <li><a onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickOnRenameDirectory();
                                        }}>Rename item</a></li>
                                        <li><a onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickOnRemoveDirectory();
                                        }}>Remove item</a></li>
                                    </ul>
                                </DropdownPortal>
                            )}
                        </div>
                    );
                })}
                <ContextMenuBody context contextMenu={contextMenu} handleRemove={handleRemove}
                                 handleRename={handleRename}/>
                {isRemoveModalVisible && <RemoveDirectoryModal directoryToRemove={directoryToChange.current as string}
                                                               setIsModalVisible={setIsRemoveModalVisible}/>}
                {isRenameModalVisible && <RenameDirectoryModal setIsModalVisible={setIsRenameModalVisible}
                                                               directoryToRename={directoryToChange.current as string}/>}
            </ul>
        </div>
    );
}

export default SideMenu;
