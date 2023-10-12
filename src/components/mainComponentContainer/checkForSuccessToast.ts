import { toast } from "react-hot-toast";
import { SuccessToast } from "../../shared/toasts/SuccessToast";
import { MutableRefObject } from "react";
import _ from "lodash";

interface checkForSuccessToastProps {
	prevConfig: MutableRefObject<unknown>;
	applicationConfig: Record<string, unknown>;
	data: Record<string, string>;
}

export function checkForSuccessToast({
	prevConfig,
	applicationConfig,
	data,
}: checkForSuccessToastProps) {
	const {
		directories: oldDirectories,
		workingFile: oldWorkingFile,
		...oldConfig
	} = prevConfig.current;
	const {
		directories: newDirectories,
		workingFile: newWorkingFile,
		...newConfig
	} = applicationConfig;
	if (!_.isEqual(oldConfig, newConfig) || oldDirectories !== newDirectories) {
		toast.custom(SuccessToast(data.message));
	}
}
