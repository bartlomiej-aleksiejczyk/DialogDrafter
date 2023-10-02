import {useContext} from "react";
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {joinPath} from "../../shared/utils/joinPath";

interface SideMenuItemProps {
    fileName: string
    directory: string
}
export function SideMenuItem ({fileName, directory}: SideMenuItemProps) {
    const {applicationConfig, setApplicationConfig, workingDirectory, userPlatform} = useContext(ApplicationConfigContext)
    const newWorkingFilePath = joinPath([directory, fileName], userPlatform);


    const handleSelectFile = () => {
        setApplicationConfig({
            ...applicationConfig,
            "workingFile": newWorkingFilePath
        })
    };

    return (
        <li>
            <a onClick={() => handleSelectFile()}
               className={
                   (newWorkingFilePath === applicationConfig["workingFile"] &&
                       directory === workingDirectory) ? "active" : "" }>
                {fileName}
            </a>
        </li>
    );
}