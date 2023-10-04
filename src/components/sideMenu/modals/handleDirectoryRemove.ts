import {SubmitHandler} from "react-hook-form";

export const handleDirectoryRemove = (filename) => {
    console.log(filename)
    const newDirectories = {...directories, [filename]: getValues("selectedDirectory")}
    setApplicationConfig({
        ...applicationConfig,
        "directories": newDirectories
    })
    document.getElementById('addDirectoryModal')?.close()
};