import {shortenText} from "./shortenText";
import {useState} from "react";

export const ChatLog = ({ qaArray }) => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const lastPair = qaArray[qaArray.length - 1];

    const handleAddPair = () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            onNewPair({ question: newQuestion, answer: newAnswer });
            setNewQuestion('');
            setNewAnswer('');
        }
    };
    return (
        <div className="chat-container">
            {qaArray.map((qaPair, index) => (
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
                <button onClick={handleAddPair} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                    Add Pair
                </button>
            </div>
        </div>
    );
};