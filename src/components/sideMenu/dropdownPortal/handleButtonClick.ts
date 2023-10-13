export const handleButtonClick = (e, key, setPosition, setVisibleDropdown) => {
	e.preventDefault();
	const rect = e.currentTarget.getBoundingClientRect();
	const dropdownHeight = 95;
	const dropdownWidth = 80;

	const shouldDisplayAbove = rect.bottom + dropdownHeight > window.innerHeight;
	const shouldDisplayToLeft = rect.left + dropdownWidth > window.innerWidth;
	setPosition({
		x: shouldDisplayToLeft ? rect.right - dropdownWidth : rect.left,
		y: shouldDisplayAbove ? rect.top - dropdownHeight : rect.bottom,
	});
	setVisibleDropdown((prev) => (prev === key ? null : key));
};
