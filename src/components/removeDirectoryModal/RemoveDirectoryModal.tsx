import React, { useContext } from "react";
import { handleDirectoryRemove } from "./handleDirectoryRemove";
import { ApplicationConfigContext } from "../initialConfig/ApplicationConfigContext";
import { GenericModalProps } from "../../shared/interfaces/GenericModalProps";
import { ModalWrapper } from "../../shared/elements/ModalWrapper";
import { removeConfirmMessageMaker } from "./removeConfirmMessageMaker";

interface RemoveDirectoryModalProps extends GenericModalProps {
	directoryToRemove: string;
}

export const RemoveDirectoryModal = ({
	directoryToRemove,
	setIsModalVisible,
}: RemoveDirectoryModalProps) => {
	const { applicationConfig, setApplicationConfig } = useContext(ApplicationConfigContext);

	const handleConfirm = async () => {
		setIsModalVisible(false);
		handleDirectoryRemove(directoryToRemove, applicationConfig, setApplicationConfig);
	};

	const handleClose = () => {
		setIsModalVisible(false);
	};

	return (
		<ModalWrapper modalName={"Confirmation"}>
			<p className="pb-4 pb-4 text-base">{removeConfirmMessageMaker(directoryToRemove)}</p>
			<div className="modal-action justify-start space-x-5">
				<button className="btn btn-secondary" onClick={handleConfirm}>
					Confirm
				</button>
				<button className="btn btn-outline" onClick={handleClose}>
					Close
				</button>
			</div>
		</ModalWrapper>
	);
};
