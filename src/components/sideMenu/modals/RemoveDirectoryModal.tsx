import React, { useContext } from "react";
import { handleDirectoryRemove } from "./handleDirectoryRemove";
import { ApplicationConfigContext } from "../../initialConfig/ApplicationConfigContext";
import { GenericModalProps } from "../../../shared/interfaces/GenericModalProps";

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
		<>
			<dialog className="modal modal-bottom sm:modal-middle" open>
				<div className="modal-box">
					<h3 className="text-lg font-bold">Confirmation</h3>
					<p className="py-4">{"MESSAGE_TEXT_TODO"}</p>
					<div className="modal-action">
						<button className="btn" onClick={handleConfirm}>
							Confirm
						</button>
						<button className="btn" onClick={handleClose}>
							Close
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};
