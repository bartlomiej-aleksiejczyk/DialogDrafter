import {getPathUntilLastSlash} from "../../../shared/utils/getPathUntilLastSlash";

export const handleDirectoryRemove = (directoryName, applicationConfig, setApplicationConfig) => {

    const { [directoryName]: DirectoryToRemove, ...newDirectories } = applicationConfig["directories"];
    const newWorkingFile = (getPathUntilLastSlash(applicationConfig["workingFile"]) === DirectoryToRemove ?
    "" : applicationConfig["workingFile"])
    setApplicationConfig({
        ...applicationConfig,
        "workingFile": newWorkingFile,
        "directories": newDirectories
    });
};