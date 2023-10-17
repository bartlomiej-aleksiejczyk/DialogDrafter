import { shortenText } from "./utils/shortenText";
import { ReactNode, useContext, useState } from "react";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { chatLogToMarkdown } from "./utils/chatToMarkdown";
import { getFilenameFromPath } from "../../shared/utils/path/getFilenameFromPath";
import { QAPair } from "./interfaces/QAPair";
import { MarkdownPreview } from "../addDirectoryModal/MarkdownPreview";

interface ChatLogBoxContent {
	filecontent: QAPair[];
	setFileContent: (QAPair) => void;
	parsedMarkdown: ReactNode;
}

export const ChatLogBoxContent = ({
	filecontent,
	setFileContent,
	parsedMarkdown,
}: ChatLogBoxContent) => {
	const [newQuestion, setNewQuestion] = useState("");
	const [newAnswer, setNewAnswer] = useState("");
	const [isPreviewToggled, setIsPreviewToggled] = useState(false);
	const [showError, setShowError] = useState(false);
	const { applicationConfig } = useContext(ApplicationConfigContext);

	const handleAddPair = () => {
		if (!newQuestion.trim() || !newAnswer.trim()) return setShowError(true);

		const newFileContent = [...filecontent, { question: newQuestion, answer: newAnswer }];
		setFileContent(newFileContent);
		setNewQuestion("");
		setNewAnswer("");
		setShowError(false);

		window.ipcRenderer.send(
			"save-working-file",
			chatLogToMarkdown(newFileContent),
			applicationConfig["workingFile"],
		);
		window.ipcRenderer.once("save-working-file-success", () => {});
	};

	const fileDisplayName = getFilenameFromPath(shortenText(applicationConfig["workingFile"], 70));

	const togglePreview = () => {
		console.log(isPreviewToggled)
		setIsPreviewToggled(!isPreviewToggled)
	};

	return (
		<div className="my-4 space-y-6 rounded-lg bg-neutral p-4 text-white shadow-lg">
			<div className="flex flex-row justify-between">
					<p className="p-4 text-3xl font-bold ">{fileDisplayName}</p>
				<div className="p-3">
				<label onClick={togglePreview} className="btn btn-outline">
					<svg className={`w-6 h-6 ${isPreviewToggled && "hidden"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
					</svg>
					<svg className={`w-6 h-6 ${!isPreviewToggled && "hidden"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706" />					</svg>
				</label>
				</div>
			</div>
			{isPreviewToggled ? (
				<MarkdownPreview className="w-full" parsedMarkdown={parsedMarkdown} />
			) : (
				<>
					{filecontent.map((qaPair, index) => (
						<div key={index} className="flex flex-col space-y-3">
							<div className="chat-message question rounded-lg bg-blue-400 p-3 text-white shadow-md">
								<span className="mr-2 text-sm font-bold">Question:</span>
								{shortenText(qaPair.question, 255)}
							</div>
							{qaPair.answer && (
								<div className="chat-message answer rounded-lg bg-gray-300 p-3 text-black shadow-md">
									<span className="mr-2 text-sm font-bold">Answer:</span>
									{shortenText(qaPair.answer, 255)}
								</div>
							)}
						</div>
					))}
					<div className="flex flex-col space-y-3">
						<div className="chat-message rounded-lg bg-blue-400 p-3 text-white shadow-md">
							<textarea
								value={newQuestion}
								onChange={(e) => setNewQuestion(e.target.value)}
								placeholder="Type your question here..."
								rows={3}
								className=" w-full rounded border border-white bg-transparent p-2 placeholder-gray-700 transition duration-200 focus:border-blue-500 focus:outline-none"
							/>
						</div>
						<div className="chat-message rounded-lg bg-gray-300 p-3 text-black shadow-md">
							<textarea
								value={newAnswer}
								onChange={(e) => setNewAnswer(e.target.value)}
								placeholder="Type your answer here..."
								rows={3}
								className="w-full rounded border border-gray-400 bg-transparent p-2 placeholder-gray-600 transition duration-200 focus:border-gray-600 focus:outline-none"
							/>
						</div>
						{showError && (
							<div className="alert alert-error relative rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700 shadow-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 inline-block h-6 w-6 shrink-0 stroke-current"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Both fields must be filled out.</span>
							</div>
						)}
						<button
							onClick={handleAddPair}
							type="submit"
							className="mt-2 rounded bg-green-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
						>
							Add Pair
						</button>
					</div>
				</>
			)}
		</div>
	);
};
