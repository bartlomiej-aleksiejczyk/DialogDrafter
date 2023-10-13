import _ from "lodash";
import { toast } from "react-hot-toast";
import { ErrorToast } from "../../shared/toasts/ErrorToast";
import { validateConfig, validateConfigProps } from "../../shared/validators/validateConfig";
import { CONFIG_PARSING_ERROR_MESSAGE } from "./errorMessages";

interface validateInitialDataProps extends validateConfigProps {
	setInitialData: (data: Record<string, unknown>) => void;
}

export function validateInitialData({ data, setInitialData }: validateInitialDataProps) {
	const { newData, oldData } = validateConfig({ data: data });
	if (!_.isEqual(oldData, newData)) {
		toast.custom(ErrorToast(CONFIG_PARSING_ERROR_MESSAGE));
		setInitialData(newData);
	}
}
