import {Toaster} from "react-hot-toast";
import {LoadInitialData} from "./components/initialConfig/LoadInitialData";

function App() {
    return (
        <>
            <LoadInitialData/>
            <Toaster position="bottom-left"/>
        </>
    )
}

export default App
