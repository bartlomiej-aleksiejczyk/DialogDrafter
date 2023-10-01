export function outputOnlyMdFiles(filesObject: {[key: number]: string, length: number}): string[] {
    // Convert the object to an array
    const filenames = Object.values(filesObject);

    // Filter the filenames based on the .md extension
    return filenames.filter(filename =>
        typeof filename === 'string' && filename.endsWith('.md')
    );
}