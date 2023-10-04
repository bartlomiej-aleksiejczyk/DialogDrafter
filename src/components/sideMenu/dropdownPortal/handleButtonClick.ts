export const handleButtonClick = (e, key, setPosition, setVisibleDropdown) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
        x: rect.left,
        y: rect.bottom
    });
    setVisibleDropdown((prev) => (prev === key ? null : key));
};