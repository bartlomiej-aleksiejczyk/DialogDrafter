export function getFilenameFromPath(path: string): string {
	const lastSlash = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));

	if (lastSlash !== -1) {
		return path.substring(lastSlash + 1);
	}

	return path;
}
