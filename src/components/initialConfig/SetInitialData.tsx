import { ApplicationConfigContext } from "./ApplicationConfigContext";
import { Dispatch, SetStateAction } from "react";
import { MainComponentContainer } from "../mainComponentContainer/MainComponentContainer";
import { validateInitialData } from "./validateInitialData";

interface SetInitialDataProps {
	applicationConfig: Record<string, unknown>;
	setApplicationConfig: Dispatch<SetStateAction<Record<string, unknown>>>;
	workingDirectory: string;
	setWorkingDirectory: Dispatch<SetStateAction<string>>;
	userPlatform: string;
}

export function SetInitialData({
	applicationConfig,
	setApplicationConfig,
	workingDirectory,
	setWorkingDirectory,
	userPlatform,
}: SetInitialDataProps) {
	// TODO: add option to restore/add default config in case of broken file

	validateInitialData({ data: applicationConfig, setInitialData: setApplicationConfig });
	return (
		<ApplicationConfigContext.Provider
			value={{
				applicationConfig,
				setApplicationConfig,
				workingDirectory,
				setWorkingDirectory,
				userPlatform,
			}}
		>
			<MainComponentContainer />
		</ApplicationConfigContext.Provider>
	);
}
