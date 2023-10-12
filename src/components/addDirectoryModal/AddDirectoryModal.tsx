import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { maxFilenameLength, validFilenameRegex } from "../../shared/validators/validators";
import { errorMessages } from "./errorMessages";
import { GenericModalProps } from "../../shared/interfaces/GenericModalProps";

type DirectoryInput = {
	directoryName: string;
};

// TODO: Change size of filepath error message
export function AddDirectoryModal({ setIsModalVisible }: GenericModalProps) {
	const [selectedDirectory, setSelectedDirectory] = useState("");

	const { applicationConfig, setApplicationConfig } = useContext(ApplicationConfigContext);
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<DirectoryInput>();

	const directories = applicationConfig["directories"];

	const isDirectoryNameAvailable = (directoryName: string) =>
		!Object.keys(directories).includes(directoryName);
	const isDirectoryPathAvailable = (directoryPath: string) => {
		const isPathAvailable = !Object.values(directories).includes(directoryPath);
		console.log(isPathAvailable);
		return isPathAvailable;
	};

	useEffect(() => {
		register("selectedDirectory", {
			required: errorMessages.selectedDirectory.required,
			validate: {
				isPathAvailable: (value) =>
					isDirectoryPathAvailable(value) ||
					errorMessages.selectedDirectory.isPathAvailable,
			},
		});
	}, [register]);

	const onSubmit: SubmitHandler<DirectoryInput> = (data) => {
		console.log(data);
		const newDirectories = {
			...directories,
			[data.directoryName]: getValues("selectedDirectory"),
		};
		setApplicationConfig({
			...applicationConfig,
			directories: newDirectories,
		});
		setIsModalVisible(false);
	};

	const openDirectoryPicker = () => {
		window.ipcRenderer.send("open-directory-picker");
	};

	const handleDirectoryPicked = (_event: any, response: Record<string, string>) => {
		console.log("Selected Directory:", response);

		setSelectedDirectory(response.path);
		setValue("selectedDirectory", response.path);
	};

	useEffect(() => {
		window.ipcRenderer.on("directory-picked", handleDirectoryPicked);
		return () => {
			window.ipcRenderer.removeAllListeners("directory-picked");
		};
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black bg-opacity-50">
			<div className="p-8">
				<div className="modal-box">
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("directoryName", {
								required: errorMessages.directoryName.required,
								pattern: {
									value: validFilenameRegex,
									message: errorMessages.directoryName.pattern,
								},
								maxLength: {
									value: maxFilenameLength,
									message: errorMessages.directoryName.maxLength,
								},
								validate: {
									isNameAvailable: (value) =>
										isDirectoryNameAvailable(value) ||
										errorMessages.directoryName.isNameAvailable,
								},
							})}
							className="input input-bordered w-full max-w-xs"
							placeholder="Directory name"
						/>
						{errors.directoryName && (
							<label className="label">
								<span className="label-text-alt">
									<span className="text-warning">
										{errors.directoryName.message}
									</span>
								</span>
							</label>
						)}
						<button
							type="button"
							className="btn btn-primary mt-4"
							onClick={openDirectoryPicker}
						>
							Select Directory
						</button>

						<p className="mt-4">
							Selected Directory: <strong>{selectedDirectory}</strong>
						</p>
						{errors.selectedDirectory && (
							<p className="text-warning">{errors.selectedDirectory.message}</p>
						)}

						<div className="modal-action mt-4">
							<button className="btn" type="submit">
								Add Directory
							</button>
							<button
								className="btn"
								type="button"
								onClick={() => setIsModalVisible(false)}
							>
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
