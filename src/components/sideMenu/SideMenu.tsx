import {useEffect, useState} from "react";
import {SideMenuItem} from "./SideMenuItem";

function getDirectoryContent(directoryPath: string): string[] {
    return ['file1', 'file2', 'file3'];
}

function SideMenu() {
    // TODO: Make files selectable
    // TODO: Merge default directory and directories list
    // TODO: Set working directory from working file

    // TODO: Handle if file is not set
    // TODO: Check if working directory is available
    // TODO: Check if working directory is in directory list
    // TODO: Check if working file is available
    // TODO: Check if working file is in working directory
    // TODO: Error handling for I/O errors

    // TODO: Add remove/rename file feature
    // TODO: Add remove/rename directory feature

    // TODO: Examine accessing object key as strong e.g., "object["key"]"

    const [selectedDirectory, setSelectedDirectory] = useState('Default directory');
    const [directoryContent, setDirectoryContent] = useState<string[]>([]);

    const availableDirectories = [{"Dir1": "Directory One"}, {"Dir2": "Directory Two"}]


    useEffect(() => {
        // Fetch and set the content of the selected directory
        const content = getDirectoryContent(selectedDirectory);
        setDirectoryContent(content);
    }, [selectedDirectory]);
    return (
        <div className="inline fixed top-0 left-0 h-screen bg-base-200 text-base-content pt-16">
            <ul className="menu p-4 w-80">
                <li className="p-2" onClick={() => setSelectedDirectory('Default directory')}>
                    <a className="active">
                        Default directory
                    </a>
                    {(selectedDirectory == "Default directory") &&
                        <>
                            <ul className="menu-dropdown menu-dropdown-show">
                                {directoryContent.map(item => (
                                    <SideMenuItem key={item} item={item}/>
                                ))}
                            </ul>
                        </>
                    }
                </li>
                {availableDirectories.map((dirObj) => {
                    const key = Object.keys(dirObj)[0];
                    const value = Object.values(dirObj)[0];
                    return (
                        <li key={key} className="p-2" onClick={() => setSelectedDirectory(value)}>
                            {(selectedDirectory === value) ?
                                <>
                                    <a className="active">{value}</a>
                                    <ul className={`menu-dropdown menu-dropdown-show`}>
                                        {directoryContent.map(item => (
                                            <SideMenuItem key={item} item={item}/>
                                        ))}
                                    </ul>
                                </>
                                : <a>{value}</a>
                            }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideMenu;
