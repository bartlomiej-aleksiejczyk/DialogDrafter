const separatorPattern = /# Question/;

export function getTextBeforeSeparator(text: string) {
	const match = text.match(separatorPattern);
	if (match) {
		return text.substring(0, match.index);
	}
	return text;
}
