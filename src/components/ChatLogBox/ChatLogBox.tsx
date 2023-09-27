import {ChatLogBoxTopBar} from "./ChatLogBoxTopBar/ChatLogBoxTopBar";
import {ChatLogBoxContent} from "./ChatLogBoxContent/ChatLogBoxContent";

export function ChatLogBox() {
    return (
        <div>
            <ChatLogBoxTopBar/>
            <ChatLogBoxContent/>
        </div>
    );
}