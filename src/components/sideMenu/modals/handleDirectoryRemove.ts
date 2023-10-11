import {getPathUntilLastSlash} from "../../../shared/utils/getPathUntilLastSlash";

export const handleDirectoryRemove = (directoryName, applicationConfig, setApplicationConfig) => {

    const { [directoryName]: DirectoryToRemove, ...newDirectories } = applicationConfig["directories"];
    let newWorkingFile = applicationConfig["workingFile"]
    if(getPathUntilLastSlash(newWorkingFile) === DirectoryToRemove) newWorkingFile = ""

    setApplicationConfig({
        ...applicationConfig,
        "workingFile": newWorkingFile,
        "directories": newDirectories
    });
};