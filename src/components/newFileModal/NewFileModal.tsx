import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { addMdExtension } from "../../shared/utils/addMdExtension";
import { joinPath } from "../../shared/utils/joinPath";
import { maxFilenameLength, validFilenameRegex } from "../../shared/validators/validators";
import { GenericModalProps } from "../../shared/interfaces/GenericModalProps";
import { useFileManagement } from "./useFileManagment";
import { useDirectoryData } from "./useDirectoryData";

type NewFileInput = {
	fileName: string;
};

// TODO: Fix filename change of size when error occurred
export function NewFileModal({ setIsModalVisible }: GenericModalProps) {
	const { platform, applicationConfig, setApplicationConfig, workingDirectory } =
		useContext(ApplicationConfigContext);
	const { createNewFile } = useFileManagement(applicationConfig, setApplicationConfig);
	const [selectedDirectory, setSelectedDirectory] = useState<string>(workingDirectory);
	const { directoryContent, isDirectoryContentLoaded } = useDirectoryData(selectedDirectory);

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<NewFileInput>();

	const isFilenameAvailable = (filename: string) =>
		!directoryContent.includes(addMdExtension(filename));

	const handleDirectoryChange = (event) => {
		clearErrors("fileName");
		setSelectedDirectory(event.target.value);
	};

	const onSubmit: SubmitHandler<NewFileInput> = (filename) => {
		const newFileFullPath = joinPath(
			[selectedDirectory, addMdExtension(filename.fileName)],
			platform,
		);
		console.log(selectedDirectory);

		createNewFile(newFileFullPath);
		setIsModalVisible(false);
	};

	const errorMessages = {
		required: "Filename is required.",
		pattern:
			"Filename can only contain alphanumeric characters, hyphens, underscores, periods, and spaces.",
		maxLength: `Filename must be shorter than ${maxFilenameLength} characters.`,
		isFilenameAvailable: "Filename already exists. Choose a different name.",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black bg-opacity-50">
			<div className="pl-112 pr-32 pt-20 pt-32">
				<div className="modal-box">
					<p className="mt-2 text-2xl">Create New Chat</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("fileName", {
								required: errorMessages.required,
								pattern: {
									value: validFilenameRegex,
									message: errorMessages.pattern,
								},
								maxLength: {
									value: maxFilenameLength,
									message: errorMessages.maxLength,
								},
								validate: {
									isFilenameAvailable: (value) => {
										return (
											isFilenameAvailable(value) ||
											errorMessages.isFilenameAvailable
										);
									},
								},
							})}
							className="input input-bordered mt-5 w-full max-w-xs"
						/>
						{errors.fileName && (
							<label className="label">
								<span className="label-text-alt">
									<span className="text-warning">{errors.fileName.message}</span>
								</span>
							</label>
						)}
						<select
							className="select mt-2 w-full max-w-xs"
							onChange={handleDirectoryChange}
							value={selectedDirectory}
						>
							<option disabled>Pick your file destination</option>
							<option key={""}></option>
							{Object.entries(applicationConfig["directories"]).map(
								([key, value]) => (
									<option key={key} value={value as string}>
										{key} [{value}]
									</option>
								),
							)}
						</select>

						<div className="modal-action">
							<button
								className="btn"
								type="submit"
								disabled={!isDirectoryContentLoaded && !selectedDirectory}
							>
								Submit
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
