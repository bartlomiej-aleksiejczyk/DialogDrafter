import { SideMenuItem } from "./SideMenuItem";
import React from "react";

interface DirectoryItemProps {
	directoryName: string;
	directoryPath: string;
	directoryContent: Array<string>;
	isSelected: boolean;
	onDirectoryClick: () => void;
}

export function DirectoryItem({
	directoryName,
	directoryPath,
	directoryContent,
	isSelected,
	onDirectoryClick,
}: DirectoryItemProps) {
	return (
		<li className="flex w-60 pb-2 pt-2" onClick={onDirectoryClick}>
			{isSelected ? (
				<>
					<a className="active inline w-60">{directoryName}</a>
					<ul className={"menu-dropdown menu-dropdown-show"}>
						{directoryContent.map((item) => (
							<SideMenuItem key={item} fileName={item} directory={directoryPath} />
						))}
					</ul>
				</>
			) : (
				<a className="w-60">{directoryName}</a>
			)}
		</li>
	);
}
