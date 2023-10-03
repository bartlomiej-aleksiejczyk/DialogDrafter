export type ContextMenu = {x: number, y: number, isVisible: boolean, directoryKey: string}
interface ContextMenuBodyProps {
    contextMenu: ContextMenu,
    handleRemove: (string) => void,
    handleRename: (string) => void,
}

export const ContextMenuBody = ({contextMenu, handleRemove, handleRename}: ContextMenuBodyProps) => (
    <div
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px`, zIndex: 1000,  position: 'fixed' }}
        className={`context-menu ${contextMenu.isVisible ? '' : 'hidden'} bg-white text-black shadow-lg p-2 rounded-md fixed`}
>
<div onClick={() => handleRemove(contextMenu.directoryKey)}>Remove</div>
<div onClick={() => handleRename(contextMenu.directoryKey)}>Rename</div>
</div>
);