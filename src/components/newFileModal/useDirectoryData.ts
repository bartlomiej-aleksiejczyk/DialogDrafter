
import { useEffect, useState } from "react";
import {outputOnlyMdFiles} from "../sideMenu/outputOnlyMdFiles";

export const useDirectoryData = (selectedDirectory) => {
    const [directoryContent, setDirectoryContent] = useState([]);
    const [isDirectoryContentLoaded, setIsDirectoryContentLoaded] = useState(false);

    const handleDirectoryData = (_event, data) => {
        const processedData = outputOnlyMdFiles(data);
        setDirectoryContent(processedData);
        setIsDirectoryContentLoaded(Boolean(processedData));
    };

    useEffect(() => {
        setIsDirectoryContentLoaded(false)
        if (!selectedDirectory) return
        // TODO: POTENTIAL MEMORY LEAK HERE filenames-data should not be recycled
        window.ipcRenderer.send("load-filenames", selectedDirectory);
        window.ipcRenderer.once("filenames-data", handleDirectoryData);
    }, [selectedDirectory]);

    return { directoryContent, isDirectoryContentLoaded };
};
