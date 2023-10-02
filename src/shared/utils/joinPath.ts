export function joinPath(parts, platform) {
    const isWindows = platform === 'win32';
    const separator = isWindows ? '\\' : '/';
    return parts.join(separator);
}
