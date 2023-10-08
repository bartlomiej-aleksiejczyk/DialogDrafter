
import { useEffect, useState } from "react";
import {outputOnlyMdFiles} from "../sideMenu/outputOnlyMdFiles";

export const useDirectoryData = (selectedDirectory) => {
    const [directoryContent, setDirectoryContent] = useState([]);
    const [isDirectoryContentLoaded, setIsDirectoryContentLoaded] = useState(false);

    const handleDirectoryData = (_event, data) => {
        const processedData = outputOnlyMdFiles(data);
        setDirectoryContent(processedData);
        setIsDirectoryContentLoaded(Boolean(processedData.length));
    };

    useEffect(() => {
        window.ipcRenderer.send("loadFilenames", selectedDirectory);
        window.ipcRenderer.once("filenamesData", handleDirectoryData);
    }, [selectedDirectory]);

    return { directoryContent, isDirectoryContentLoaded };
};
