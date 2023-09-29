import React from 'react';
import {handleScrollDown} from "./utils/handleScrollDown";

export function ScrollDownButton() {
    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={handleScrollDown}
                className="btn btn-primary"
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 7 4 4 4-4M1 1l4 4 4-4"/>
                </svg>
            </button>
        </div>
    );
}