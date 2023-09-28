export function shortenText(text, maxLength) {
    // Check if the length of the text is less than or equal to the maximum length
    if (text.length <= maxLength) {
        // If so, return the text as is
        return text;
    }

    // Find the last whitespace character before maxLength
    let lastSpaceIndex = text.lastIndexOf(' ', maxLength);

    // If there's no suitable whitespace, use the maxLength
    if (lastSpaceIndex === -1) {
        lastSpaceIndex = maxLength;
    }

    // Truncate the text at the last whitespace and append "..."
    return text.slice(0, lastSpaceIndex) + '...';
}