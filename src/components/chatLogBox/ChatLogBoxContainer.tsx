import {ScrollDownButton} from "./ScrollDownButton";
import {ChatLogBoxLoader} from "./ChatLogBoxLoader";

export function ChatLogBoxContainer() {
    // TODO: Check if working file is not available and handle
    return (
        <div className="pt-20 pl-112 pr-32 pt-32">
            <ChatLogBoxLoader/>
            <ScrollDownButton/>
        </div>
    );
}