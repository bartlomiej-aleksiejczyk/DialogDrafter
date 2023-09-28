export function chatLogToMarkdown(qaArray) {
    return qaArray.map(qaPair => {
        const question = `# Question\n${qaPair.question}`;
        const answer = qaPair.answer !== null ? `\n# Answer\n${qaPair.answer}` : '';
        return `${question}${answer}`;
    }).join('\n\n');
}
