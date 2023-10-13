export function joinPath(parts: string[], platform: string) {
	const isWindows = platform === "win32";
	const separator = isWindows ? "\\" : "/";
	return parts.join(separator);
}
