import { shortenText } from "./utils/shortenText";
import { useContext, useState } from "react";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { chatLogToMarkdown } from "./utils/chatToMarkdown";
import { getFilenameFromPath } from "../../shared/utils/getFilenameFromPath";

// TODO: Make single question/answer editable

// TODO: Check what will happen when process crashes during write "Changes are written to disk atomically, so if the process crashes during a write, it will not corrupt the existing config."

export const ChatLogBoxContent = ({ filecontent, setFileContent }) => {
	const [newQuestion, setNewQuestion] = useState("");
	const [newAnswer, setNewAnswer] = useState("");
	const [showError, setShowError] = useState(false);
	const { applicationConfig } = useContext(ApplicationConfigContext);

	const handleAddPair = async () => {
		if (newQuestion.trim() && newAnswer.trim()) {
			const newFileContent = [...filecontent, { question: newQuestion, answer: newAnswer }];
			await setFileContent(newFileContent);
			setNewQuestion("");
			setNewAnswer("");
			setShowError(false);

			window.ipcRenderer.send(
				"save-working-file",
				chatLogToMarkdown(newFileContent),
				applicationConfig["workingFile"],
			);
			window.ipcRenderer.once("save-working-file-success", (event, data) => {
				console.log(data.message);
			});
		} else {
			setShowError(true);
		}
	};
	const fileDisplayName = getFilenameFromPath(shortenText(applicationConfig["workingFile"], 70));
	return (
		<div className="my-4 space-y-6 rounded-lg bg-neutral p-4 text-white shadow-lg">
			<span className="p-4 text-3xl font-bold ">{fileDisplayName}</span>
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
					className="mt-2 rounded bg-green-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
				>
					Add Pair
				</button>
			</div>
		</div>
	);
};
