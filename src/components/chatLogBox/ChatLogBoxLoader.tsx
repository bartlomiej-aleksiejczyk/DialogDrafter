import { markdownToChatLogParser } from "./utils/markdownToChatLogParser";
import { ChatLogBoxContent } from "./ChatLogBoxContent";
import { useContext, useEffect, useState } from "react";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { toast } from "react-hot-toast";
import { ErrorToast } from "../../shared/toasts/ErrorToast";

export function ChatLogBoxLoader() {
	const [fileContent, setFileContent] = useState<string[] | null>(null);
	const { applicationConfig, setApplicationConfig } = useContext(ApplicationConfigContext);
	// TODO: handle errors hen loading non-existent file
	// TODO: validate if markdown file has good format

	const handleFileData = (_event, data) => {
		setFileContent(markdownToChatLogParser(data));
	};
	const handleFileError = (_event, data) => {
		toast.custom(ErrorToast(data));
		setApplicationConfig({ ...applicationConfig, workingFile: "" });
	};

	useEffect(() => {
		const filePath = applicationConfig["workingFile"];
		if (!filePath) {
			setFileContent(null);
			return;
		}
		window.ipcRenderer.send("load-working-file", filePath);
		window.ipcRenderer.on("working-file", handleFileData);
		window.ipcRenderer.on("working-file-error", handleFileError);
		return () => {
			window.ipcRenderer.removeAllListeners("working-file");
			window.ipcRenderer.removeAllListeners("send-platform");
		};
	}, [applicationConfig]);

	return (
		<div className="lg:w[50vw] lg:h[25vh] flex grow flex-col justify-center md:h-full md:w-full">
			{fileContent ? (
				<ChatLogBoxContent filecontent={fileContent} setFileContent={setFileContent} />
			) : (
				<div className="text-center">
					<p className="mb-4 text-lg font-bold md:text-xl lg:text-3xl">
						No Working File Available
					</p>
					<p className="text-sm md:text-base lg:text-lg">
						Please select a working file or create a new one to get started.
					</p>
				</div>
			)}
		</div>
	);
}
