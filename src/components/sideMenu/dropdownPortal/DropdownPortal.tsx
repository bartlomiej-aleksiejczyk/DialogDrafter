import React from "react";
import ReactDOM from "react-dom";

export const DropdownPortal = ({ children, position }) => {
	const dropdown = (
		<div className={"fixed"} style={{ position: "fixed", top: position.y, left: position.x }}>
			{children}
		</div>
	);

	return ReactDOM.createPortal(dropdown, document.body);
};
