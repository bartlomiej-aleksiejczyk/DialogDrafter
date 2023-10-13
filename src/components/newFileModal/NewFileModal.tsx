import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { addMdExtension } from "../../shared/utils/addMdExtension";
import { joinPath } from "../../shared/utils/path/joinPath";
import { maxFilenameLength, validFilenameRegex } from "../../shared/validators/validators";
import { GenericModalProps } from "../../shared/interfaces/GenericModalProps";
import { useFileManagement } from "./useFileManagment";
import { useDirectoryData } from "./useDirectoryData";
import { ModalWrapper } from "../../shared/elements/ModalWrapper";
import { newFileErrorMessages } from "./newFileErrorMessages";

type NewFileInput = {
	fileName: string;
};

// TODO: Fix filename change of size when error occurred
// TODO: Alter primary button color
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
		createNewFile(newFileFullPath);
		setIsModalVisible(false);
	};
	const errorMessages = newFileErrorMessages();

	return (
		<ModalWrapper modalName={"Create New Chat"}>
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
									isFilenameAvailable(value) || errorMessages.isFilenameAvailable
								);
							},
						},
					})}
					className="input input-bordered w-full max-w-xs"
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
					{Object.entries(applicationConfig["directories"]).map(([key, value]) => (
						<option key={key} value={value as string}>
							{key} [{value}]
						</option>
					))}
				</select>

				<div className="modal-action justify-end space-x-5">
					<button
						className="btn btn-primary w-24"
						type="submit"
						disabled={!isDirectoryContentLoaded && !selectedDirectory}
					>
						Submit
					</button>
					<button
						className="btn btn-outline"
						type="button"
						onClick={() => setIsModalVisible(false)}
					>
						Close
					</button>
				</div>
			</form>
		</ModalWrapper>
	);
}
