import {markdownToChatLogParser} from "./markdownToChatLogParser";
import {chatLogToMarkdown} from "./chatToMarkdown";
import {ChatLog} from "./ChatLog";

// https://betterprogramming.pub/create-your-own-markdown-parser-bffb392a06db
export function MarkdownContent(data: { data: string }) {
    const chat =  markdownToChatLogParser(data.data)
    const md = chatLogToMarkdown(chat)
    console.log(md)
    return (
        <>
            <div className="flex flex-col justify-center">
                <ChatLog qaArray={chat}/>
            </div>
        </>
    )
}

