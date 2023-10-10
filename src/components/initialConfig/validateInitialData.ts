import _ from "lodash";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";
import {validateConfig, validateConfigProps} from "../../shared/validators/validateConfig";

// TODO: Add migration mechanism
interface validateInitialDataProps extends validateConfigProps {
    setInitialData: (data: Record<string, unknown>) => void;
}

export function validateInitialData({data, setInitialData}: validateInitialDataProps) {

    const {newData, oldData} = validateConfig({data})
    if (!_.isEqual(oldData, newData)) {
        toast.custom(ErrorToast("Your configuration file is has missing or invalid properties that were set to default values"));
        setInitialData(newData)
    }
}