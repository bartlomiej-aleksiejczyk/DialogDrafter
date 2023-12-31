import React, { useContext } from "react";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorMessages } from "../addDirectoryModal/errorMessages";
import { maxFilenameLength, validFilenameRegex } from "../../shared/validators/validators";
import { GenericModalProps } from "../../shared/interfaces/GenericModalProps";
import { handleDirectoryRename } from "./handleDirectoryRename";
import { ModalWrapper } from "../../shared/elements/ModalWrapper";
import { renameMessage } from "./renameMessage";

interface RenameDirectoryModalProps extends GenericModalProps {
	directoryToRename: string;
}

type RenameInput = {
	newName: string;
};

export const RenameDirectoryModal = ({
	directoryToRename,
	setIsModalVisible,
}: RenameDirectoryModalProps) => {
	const { applicationConfig, setApplicationConfig } = useContext(ApplicationConfigContext);
	const directories = applicationConfig["directories"];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RenameInput>();

	const isDirectoryNameAvailable = (directoryName: string) =>
		!Object.keys(directories).includes(directoryName);

	const handleCloseModal = () => setIsModalVisible(false);

	const onSubmit: SubmitHandler<RenameInput> = (data) => {
		handleDirectoryRename(
			directoryToRename,
			data.newName,
			applicationConfig,
			setApplicationConfig,
		);
		handleCloseModal();
	};

	return (
		<ModalWrapper modalName={"Confirmation"}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p className="pb-4 text-lg">{renameMessage}</p>
				<input
					{...register("newName", {
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
					placeholder={directoryToRename}
				/>
				{errors.newName && <label className="label"> {errors.newName.message} </label>}
				<div className="modal-action justify-end space-x-5">
					<button className="btn btn-primary" type="submit">
						Rename
					</button>
					<button className="btn btn-outline" onClick={handleCloseModal}>
						Close
					</button>
				</div>
			</form>
		</ModalWrapper>
	);
};
