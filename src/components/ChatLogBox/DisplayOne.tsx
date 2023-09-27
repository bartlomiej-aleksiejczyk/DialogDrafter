import {useEffect, useState} from 'react';
import {ObjectDisplayer} from "./ObjectDisplayer";
import {ListDisplayer} from "./ListDisplayer";

export function DisplayOne() {
    const [data, setData] = useState()
    const [filenames, setFilenames] = useState<string[]>();
    const handleSaveClick = () => {
        window.ipcRenderer.send("saveChatLog", {test: "11success", test2: "double success"});
    }
    const handleLoadClick = () => {
        window.ipcRenderer.send("loadFile", "data.json");
    }
    const handleLoadFilenamesClick = () => {
        window.ipcRenderer.send("loadFilenames", "\\\\192.168.1.12\\aln-brt");
    };

    useEffect(() => {
        const handleFilenamesData = (_event, filenames: string[]) => {
            setFilenames(filenames);
            console.log((filenames))
        };

        window.ipcRenderer.on("filenamesData", handleFilenamesData);

        // Cleanup listener on component unmount
        return () => {
            window.ipcRenderer.removeListener("filenamesData", handleFilenamesData);
        };
    }, []);

    useEffect(() => {
        const handleFileData = (_event, data) => {
            console.log("File content:", data);
            setData(data)
            // Do something with the file content
        };

        window.ipcRenderer.on("fileData", handleFileData);

        // Cleanup listener on component unmount
        return () => {
            window.ipcRenderer.removeListener("fileData", handleFileData);
        };
    }, []);
    return (
        <>
            <button
                onClick={handleSaveClick} className="btn w-40 mb-3">
                Save Object
            </button>
            <hr/>
            <button onClick={handleLoadClick} className="btn w-40 mb-3">
                Load File
            </button>
            {data &&
                <ObjectDisplayer data={data}/>
            }
            <hr/>
            <button onClick={handleLoadFilenamesClick} className="btn w-40 mb-3">
                Load Filenames
            </button>
            {filenames &&
                <ListDisplayer filenames={filenames}/>
            }
        </>
    )
}

