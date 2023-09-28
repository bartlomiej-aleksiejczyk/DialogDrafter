import { marked }  from "marked";
import {markdownToChatLogParser} from "./markdownToChatLogParser";
import {chatLogToMarkdown} from "./chatToMarkdown";

// https://betterprogramming.pub/create-your-own-markdown-parser-bffb392a06db
export function MarkdownContent(data: { data: string }) {
    const html = marked.parse(data.data);
    const chat =  (data.data)
    const md = chatLogToMarkdown(chat)
    console.log(md)
    return (
        <>
            <div className="flex flex-col justify-center">
                <ol className="max-w-md space-y-1 list-decimal list-inside dark:text-gray-400">
                    <div dangerouslySetInnerHTML={{__html: html}} />
                </ol>
            </div>
        </>
    )
}

