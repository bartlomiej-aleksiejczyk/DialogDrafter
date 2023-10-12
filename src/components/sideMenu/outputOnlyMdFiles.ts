export function outputOnlyMdFiles(filesObject: {
	[key: number]: string;
	length: number;
}): string[] {
	const filenames = Object.values(filesObject);

	return filenames.filter((filename) => typeof filename === "string" && filename.endsWith(".md"));
}
