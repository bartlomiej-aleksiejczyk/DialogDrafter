import { getTextBeforeSeparator } from "./getTextBeforeSeparator";
import { QAPair } from "../interfaces/QAPair";

const splitSeparators = /# Question|# Answer/;

export function markdownToChatLogParser(data: string) {
	const qaPairs = data.split(splitSeparators).slice(1);
	const remainingText = getTextBeforeSeparator(data);

	const qaArray: QAPair[] = remainingText
		? [{ question: "Text before separators:", answer: remainingText }]
		: [];

	for (let i = 0; i < qaPairs.length; i += 2) {
		const question = qaPairs[i].trim();
		const answer = qaPairs[i + 1] ? qaPairs[i + 1].trim() : null;
		qaArray.push({ question, answer });
	}
	return qaArray;
}
