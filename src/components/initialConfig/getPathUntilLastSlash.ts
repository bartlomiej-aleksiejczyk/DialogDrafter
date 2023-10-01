export function getPathUntilLastSlash(path: string): string {
    const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));

    if (lastSlash !== -1) {
        return path.substring(0, lastSlash);
    }

    return path;
}