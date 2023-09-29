const splitSeparators = /# Question|# Answer/

export function markdownToChatLogParser(data: string) {
    const qaPairs = data.split(splitSeparators).slice(1);
    const qaArray = [];

    for (let i = 0; i < qaPairs.length; i += 2) {
        const question = qaPairs[i].trim();
        const answer = qaPairs[i + 1] ?
            qaPairs[i + 1].trim()
            : null;
        qaArray.push({ question, answer });
    }
    return qaArray
}