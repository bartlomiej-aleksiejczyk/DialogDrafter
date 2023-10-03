import {useContext, useEffect, useState} from "react";
import {SideMenuItem} from "./SideMenuItem";
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {outputOnlyMdFiles} from "./outputOnlyMdFiles";
import {ContextMenu, ContextMenuBody} from "./contextMenu/ContextMenuBody";
import {handleRightClick} from "./contextMenu/handleRightClick";
import {handleRemove} from "./contextMenu/handleRemove";
import {handleRename} from "./contextMenu/handleRename";


function SideMenu() {

    // TODO: Check if transition App -> LoadInitialData -> SetInitialData -> [TopNavbar, SideMenu, ChatLogBoxContainer] is good idea

    //TODO: Handle if directory path is wrong
    // TODO: Handle if file is not set
    // TODO: Check if working directory is available
    // TODO: Check if working directory is in directory list
    // TODO: Check if working file is available
    // TODO: Check if working file is in working directory
    // TODO: Error handling for I/O errors

    // TODO: Add remove/rename file feature
    // TODO: Add remove/rename directory feature

    // TODO: Examine accessing object key as strong e.g., "object["key"]"

    const [directoryContent, setDirectoryContent] = useState<string[]>([]);
    const [contextMenu, setContextMenu] = useState<ContextMenu>({
        x: 0,
        y: 0,
        isVisible: false,
        directoryKey: ''
    });


    const {applicationConfig, workingDirectory, setWorkingDirectory} = useContext(ApplicationConfigContext)
    const availableDirectories = applicationConfig["directories"]
    const handleFileData = (_event, data) => {
        setDirectoryContent(outputOnlyMdFiles(data));
    };

    useEffect(() => {
        const handleGlobalClick = () => setContextMenu(prev => ({...prev, isVisible: false}));
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);
    useEffect(() => {
        window.ipcRenderer.send("loadFilenames", workingDirectory);
        window.ipcRenderer.once("filenamesData", handleFileData);
        return () => {
        };
    }, [workingDirectory, applicationConfig]);
    const handleSelectDirectory = (directoryPath) => {
        setWorkingDirectory(directoryPath)
    };
    return (
        <div className="inline fixed top-0 left-0 h-screen bg-base-200 text-base-content pt-16 overflow-hidden ">
            <ul className="menu p-4 w-80 overflow-y-auto max-h-[calc(100vh-4rem)] flex-nowrap ">
                {Object.entries(availableDirectories).map(([key, value]) => {
                    return (
                        <li key={key} className="p-2"
                            onClick={() => handleSelectDirectory(value)}
                        >
                            {(workingDirectory === value) ?
                                <>
                                    <a className="active w-60"
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

                    );
                })}
                <ContextMenuBody context contextMenu={contextMenu} handleRemove={handleRemove}
                                 handleRename={handleRename}/>
            </ul>
        </div>
    );
}

export default SideMenu;
