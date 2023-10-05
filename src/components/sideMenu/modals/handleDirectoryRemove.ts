export const handleDirectoryRemove = (filename, applicationConfig, setApplicationConfig) => {
    const { [filename]: fileToRemove, ...newDirectories } = applicationConfig["directories"];
    setApplicationConfig({
        ...applicationConfig,
        "directories": newDirectories
    });
    document.getElementById('addDirectoryModal')?.close();
};