import {toast} from "react-hot-toast";
//TODO: Clean up this, prop feels wrong
export const SuccessToast = (message) => (
    <div
        className={`${
            message.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full pointer-events-auto alert alert-success`}
    >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <div>
            <h3 className="font-bold">Success!</h3>
            <div className="text-xs">{message}</div>
        </div>
        <button onClick={() => toast.remove(message.id)} className="btn btn-sm">
            Close
        </button>
    </div>
)