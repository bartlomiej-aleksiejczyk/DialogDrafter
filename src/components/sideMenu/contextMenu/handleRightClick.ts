export const handleRightClick = (e: React.MouseEvent, directoryKey: string, setContextMenu) => {
    e.preventDefault();
    console.log(`RIGHT CLICK ON ${directoryKey}`)
    setContextMenu({
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
        directoryKey: directoryKey
    });
};