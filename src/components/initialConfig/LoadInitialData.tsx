import { useEffect, useState } from "react";
import { SetInitialData } from "./SetInitialData";
import { defaultConfig } from "../../shared/config/defaultConfig";
import { getPathUntilLastSlash } from "../../shared/utils/path/getPathUntilLastSlash";
import { GenericErrorHandler } from "../ErrorHandler/GenericErrorHandler";
import { toast } from "react-hot-toast";
import { ErrorToast } from "../../shared/toasts/ErrorToast";
import { validateConfig } from "../../shared/validators/validateConfig";
import { CONFIG_LOADING_ERROR_MESSAGE } from "./errorMessages";

export function LoadInitialData() {
	const [applicationConfig, setApplicationConfig] = useState<Record<string, unknown>>();
	const [workingDirectory, setWorkingDirectory] = useState<string>();
	const [userPlatform, setUserPlatform] = useState<string>();

	const handleConfigError = (_event, data) => {
		toast.custom(ErrorToast(data));
		const { newData } = validateConfig({ data: {} });
		window.ipcRenderer.send("save-config-file", newData, defaultConfig.SETTINGS_PATH);
		window.ipcRenderer.once("save-config-file-success", () => {
			setApplicationConfig(newData);
			setWorkingDirectory("");
		});
	};

	const handleFileData = (_event, data) => {
		try {
			const parsedData = JSON.parse(data);
			setApplicationConfig(parsedData);
			if (parsedData["workingFile"]) {
				setWorkingDirectory(getPathUntilLastSlash(parsedData["workingFile"]));
			} else {
				setWorkingDirectory("");
			}
		} catch (e) {
			handleConfigError(_event, CONFIG_LOADING_ERROR_MESSAGE);
		}
	};
	const handleSendPlatform = (event, platform) => {
		setUserPlatform(platform);
	};
	useEffect(() => {
		window.ipcRenderer.send("get-platform");
		window.ipcRenderer.on("send-platform", handleSendPlatform);
		window.ipcRenderer.send("load-config-file", defaultConfig.SETTINGS_PATH);
		window.ipcRenderer.on("config-data", handleFileData);
		window.ipcRenderer.on("config-error", handleConfigError);
		return () => {
			window.ipcRenderer.removeAllListeners("config-error");
			window.ipcRenderer.removeAllListeners("send-platform");
		};
	}, []);
	return (
		<>
			<GenericErrorHandler />
			{applicationConfig !== undefined && workingDirectory !== undefined && (
				<SetInitialData
					applicationConfig={applicationConfig}
					setApplicationConfig={setApplicationConfig}
					workingDirectory={workingDirectory}
					setWorkingDirectory={setWorkingDirectory}
					userPlatform={userPlatform as string}
				/>
			)}
		</>
	);
}
