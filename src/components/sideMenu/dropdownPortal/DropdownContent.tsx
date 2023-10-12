export function DropdownContent({ onRenameClick, onRemoveClick }) {
	return (
		<ul
			tabIndex={0}
			className="menu dropdown-content rounded-box mt-1 w-52 bg-base-100 p-2 shadow shadow"
		>
			<li>
				<a onClick={onRenameClick}>Rename item</a>
			</li>
			<li>
				<a onClick={onRemoveClick}>Remove item</a>
			</li>
		</ul>
	);
}
