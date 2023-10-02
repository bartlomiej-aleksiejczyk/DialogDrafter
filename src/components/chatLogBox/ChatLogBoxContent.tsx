import {shortenText} from "./utils/shortenText";
import {useContext, useState} from "react";
import {ApplicationConfigContext} from "../initialConfig/ApplicationConfigContext";
import {chatLogToMarkdown} from "./utils/chatToMarkdown";

// TODO: Make single question/answer editable
// TODO: Change chatlog appearance
// TODO: Change empty chatLog appearance, center out stuff

export const ChatLogBoxContent = ({filecontent, setFileContent}) => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [showError, setShowError] = useState(false);
    const {applicationConfig} = useContext(ApplicationConfigContext)

    const handleAddPair = async () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            const newFileContent = [...filecontent, {question: newQuestion, answer: newAnswer}]
            await setFileContent(newFileContent);
            setNewQuestion('');
            setNewAnswer('');
            setShowError(false);
            window.ipcRenderer.send("saveWorkingFile", chatLogToMarkdown(newFileContent), applicationConfig["workingFile"]);
            window.ipcRenderer.on('saveWorkingFileSuccess', (event, data) => {
                console.log(data.message);
            });
        } else {
            setShowError(true);
        }
    };
    return (
        <div className="chat-container">
            {filecontent.map((qaPair, index) => (
                <div key={index} className="flex flex-col mb-4">
                    <div className="chat-message question bg-blue-300 text-white p-2 rounded-lg">
                        <span className="font-bold text-sm mr-2">Question:</span>
                        {shortenText(qaPair.question, 255)}
                    </div>
                    {qaPair.answer && (
                        <div className="chat-message answer bg-gray-300 text-black p-2 rounded-lg mt-2">
                            <span className="font-bold text-sm mr-2">Answer:</span>
                            {shortenText(qaPair.answer, 255)}
                        </div>
                    )}
                </div>
            ))}
            <div className="flex flex-col mb-4">
                <div className="chat-message bg-blue-300 text-white p-2 rounded-lg mb-2">
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            rows={3}
                            className="w-full p-2"
                        />
                </div>
                <div className="chat-message bg-gray-300 text-black p-2 rounded-lg mt-2">
                        <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            rows={3}
                            className="w-full p-2"
                        />
                </div>
                {showError &&
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Both fields must be filled out.</span>
                    </div>}
                <button onClick={handleAddPair} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                    Add Pair
                </button>
            </div>
        </div>
    );
};