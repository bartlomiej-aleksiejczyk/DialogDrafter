import { ReactNode } from "react";

interface ModalWrapperProps {
	children: ReactNode;
	modalName: string;
}

export function ModalWrapper(props: ModalWrapperProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center items-center justify-center overscroll-contain bg-black bg-opacity-50">
			<div className="flex h-full w-full items-center items-center justify-center">
				<div className="modal-box w-4/5">
					<p className="pb-5 pt-1 text-xl font-bold">{props.modalName}</p>
					{props.children}
				</div>
			</div>
		</div>
	);
}
