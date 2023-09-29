import {markdownToChatLogParser} from "./utils/markdownToChatLogParser";
import {ChatLogBoxContent} from "./ChatLogBoxContent";
import {useContext, useEffect, useState} from "react";
import {ApplicationConfigContext} from "../prepareInitialConfig/ApplicationConfigContext";

export function ChatLogBoxLoader() {
    const [fileContent, setFileContent] = useState([]);
    const applicationConfig = useContext(ApplicationConfigContext)
    // TODO: validate if markdown file has good format
    useEffect(() => {
        const filePath = applicationConfig["workingFile"]
        window.ipcRenderer.send("loadWorkingFile", filePath)
        const handleFileData = (_event, data) => {setFileContent(markdownToChatLogParser(data))};
        window.ipcRenderer.on("workingFile", handleFileData);
        return () => {
            window.ipcRenderer.removeListener("workingFile", handleFileData);
        };
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center">
                {fileContent && <ChatLogBoxContent filecontent={fileContent} setFileContent={setFileContent}/>}
            </div>
        </>
    )
}

