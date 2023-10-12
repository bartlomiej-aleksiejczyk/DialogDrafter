import { ScrollDownButton } from "./ScrollDownButton";
import { ChatLogBoxLoader } from "./ChatLogBoxLoader";

export function ChatLogBoxContainer() {
	return (
		<div className="w-full pl-80 pt-16 sm:pt-16 md:pt-20 lg:pl-96 lg:pr-16 lg:pt-24 xl:pl-112 xl:pr-32 xl:pt-28 xl:pt-32">
			<ChatLogBoxLoader />
			<ScrollDownButton />
		</div>
	);
}
