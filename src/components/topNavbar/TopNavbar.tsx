interface TopNavbarProps {
	setIsNewFileModalVisible: (visible: boolean) => void;
	setIsAddDirectoryModalVisible: (visible: boolean) => void;
}

export function TopNavbar({
	setIsNewFileModalVisible,
	setIsAddDirectoryModalVisible,
}: TopNavbarProps) {
	const openNewFileModal = () => setIsNewFileModalVisible(true);
	const openAddDirectoryModal = () => setIsAddDirectoryModalVisible(true);

	return (
		<div className="navbar fixed z-50 flex justify-between bg-base-300 font-medium">
			<div className="flex space-x-8 pl-4">
				<div>
					<span className="text-3xl font-bold">DialogDrafter</span>
				</div>
				<div className="pl-20">
					<button
						className="btn btn-primary normal-case sm:text-sm md:text-lg xl:text-xl"
						onClick={openNewFileModal}
					>
						New Chat
					</button>
				</div>
				<div>
					<button
						className="btn btn-primary btn-outline normal-case sm:text-sm md:text-lg xl:text-xl"
						onClick={openAddDirectoryModal}
					>
						Add Directory
					</button>
				</div>
			</div>
			{/*Future release feature*/}
			{/*<div>
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block h-5 w-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						></path>
					</svg>
				</button>
			</div>*/}
		</div>
	);
}
