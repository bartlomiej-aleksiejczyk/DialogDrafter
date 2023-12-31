import hljs from "highlight.js";
import { useEffect } from "react";
import "highlight.js/styles/base16/bright.css";

interface MarkdownPreviewProps {
	parsedMarkdown: string;
}

export function MarkdownPreview({ parsedMarkdown }: MarkdownPreviewProps) {
	useEffect(() => {
		hljs.highlightAll();
	}, [parsedMarkdown]);
	return (
		<>
			<hr className="rounded-xl border-t-8 border-solid"/>
			<div className="markdown-content" dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
		</>
	);
}
