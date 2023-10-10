import {markdownToChatLogParser} from "./utils/markdownToChatLogParser";
import {ChatLogBoxContent} from "./ChatLogBoxContent";
import {useContext, useEffect, useState} from "react";
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";

export function ChatLogBoxLoader() {
    const [fileContent, setFileContent] = useState<string[] | null>(null);
    const {applicationConfig} = useContext(ApplicationConfigContext)
    // TODO: handle errors hen loading non-existent file
    // TODO: validate if markdown file has good format
    useEffect(() => {
        const filePath = applicationConfig["working-file"]
        if (!filePath) return;
        window.ipcRenderer.send("load-working-file", filePath)
        const handleFileData = (_event, data) => {
            setFileContent(markdownToChatLogParser(data))
        };
        window.ipcRenderer.once("working-file", handleFileData);
        return () => {
        };
    }, [applicationConfig]);

    return (
        <div className="flex flex-col justify-center w-[50vw] h-[25vh]">
            {fileContent ? (<ChatLogBoxContent filecontent={fileContent} setFileContent={setFileContent}/>
            ) : (
                <div className="text-center">
                    <p className=" normal-case text-3xl font-bold mb-4">No Working File Available</p>
                    <p>Please select a working file or create a new one to get started.</p>
                </div>
            )}
        </div>
    )
}


