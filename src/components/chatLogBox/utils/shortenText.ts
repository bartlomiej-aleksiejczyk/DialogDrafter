export function shortenText(text, maxLength) {
	if (text.length <= maxLength) {
		return text;
	}

	let lastSpaceIndex = text.lastIndexOf(" ", maxLength);
	if (lastSpaceIndex === -1) {
		lastSpaceIndex = maxLength;
	}

	return text.slice(0, lastSpaceIndex) + "...";
}
