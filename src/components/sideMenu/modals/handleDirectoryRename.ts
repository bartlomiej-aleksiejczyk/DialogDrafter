export const handleDirectoryRename = (filenameOld, filenameNew,applicationConfig, setApplicationConfig) => {
    const { [filenameOld]: fileToRemove, ...clearedDirectories } = applicationConfig["directories"];
    const newDirectories = {...clearedDirectories, filenameNew: fileToRemove.value };
    setApplicationConfig({
        ...applicationConfig,
        "directories": newDirectories
    });
    document.getElementById('addDirectoryModal')?.close();
};