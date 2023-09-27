import { useState } from 'react';

export function ChatLogCreator() {
    const [logEntries, setLogEntries] = useState([{ question: '', answer: '' }]);

    const addEntry = () => {
        setLogEntries([...logEntries, { question: '', answer: '' }]);
    }

    const updateEntry = (index, question, answer) => {
        const newEntries = [...logEntries];
        newEntries[index] = { question, answer };
        setLogEntries(newEntries);
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="text-xl font-medium text-black">ChatCraft</div>
                {logEntries.map((entry, index) => (
                    <div key={index} className="mt-4">
                        <div className="mb-2">
                            <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">Question</label>
                            <textarea
                                id={`question-${index}`}
                                name={`question-${index}`}
                                rows={3}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Type your question here"
                                value={entry.question}
                                onChange={(e) => updateEntry(index, e.target.value, entry.answer)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700">Answer</label>
                            <textarea
                                id={`answer-${index}`}
                                name={`answer-${index}`}
                                rows={3}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Type the answer here"
                                value={entry.answer}
                                onChange={(e) => updateEntry(index, entry.question, e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <button onClick={addEntry} className="mt-4 daisy-btn bg-blue-500 text-white">Add Entry</button>
            </div>
        </div>
    );
}