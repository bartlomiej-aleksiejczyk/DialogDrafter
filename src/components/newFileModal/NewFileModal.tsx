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
import { PICK_DESTINATION_INFO } from "../addDirectoryModal/addDirectoryModalValues.ts";
import { isString } from "../../shared/utils/isString.ts";

type NewFileInput = {
	fileName: string;
};

export function NewFileModal({ setIsModalVisible }: GenericModalProps) {
	const { platform, applicationConfig, setApplicationConfig } =
		useContext(ApplicationConfigContext);
	const { createNewFile } = useFileManagement(applicationConfig, setApplicationConfig);
	const [selectedDirectory, setSelectedDirectory] = useState<string>("");
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
					placeholder="New file name"
				/>
				{errors.fileName && (
					<label className="label">
						<span className="label-text-alt">
							<span className="text-warning">{errors.fileName.message}</span>
						</span>
					</label>
				)}
				<select
					className="select select-bordered mt-2 w-full max-w-xs"
					onChange={handleDirectoryChange}
					defaultValue={PICK_DESTINATION_INFO}
				>
					<option disabled>{PICK_DESTINATION_INFO}</option>
					{Object.entries(applicationConfig["directories"]).map(
						([key, value]) =>
							isString(value) && (
								<option key={key} value={value}>
									{key} {value}
								</option>
							),
					)}
				</select>

				<div className="modal-action justify-end space-x-5">
					<button
						className="btn btn-primary w-24"
						type="submit"
						disabled={
							!isDirectoryContentLoaded && selectedDirectory !== PICK_DESTINATION_INFO
						}
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
