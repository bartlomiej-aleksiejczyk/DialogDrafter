interface TopNavbarProps {
    setIsNewFileModalVisible: (boolean) => void;
    setIsAddDirectoryModalVisible: (boolean) => void;
}

export function TopNavbar({setIsNewFileModalVisible, setIsAddDirectoryModalVisible}: TopNavbarProps) {
    return (
        <div className=" font-medium navbar fixed bg-base-300 z-50 flex justify-between">
            <div className="flex space-x-8 pl-4">
                <div>
                    <span className="normal-case text-3xl font-bold">DialogDrafter</span>
                </div>
                <div className="pl-20">
                    <button
                        className="btn btn-primary normal-case text-xl"
                        onClick={() => setIsNewFileModalVisible(true)}
                    >
                        <span>New Chat</span>
                    </button>
                </div>
                <div>
                    <button
                        className="btn btn-outline btn-primary normal-case text-xl"
                        onClick={() => setIsAddDirectoryModalVisible(true)}
                    >
                        <span>Add Directory</span>
                    </button>
                </div>
            </div>
            <div className="">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-5 h-5 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}