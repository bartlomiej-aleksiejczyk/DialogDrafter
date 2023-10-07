export const handleDirectoryRename = (filenameOld, filenameNew,applicationConfig, setApplicationConfig) => {
    const { [filenameOld]: fileToRemove, ...clearedDirectories } = applicationConfig["directories"];
    const newDirectories = {...clearedDirectories, [filenameNew]: fileToRemove };
    setApplicationConfig({
        ...applicationConfig,
        "directories": newDirectories
    });
};