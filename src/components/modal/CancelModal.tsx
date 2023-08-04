import Portal from "../portal/Portal";

import { useRef, useEffect, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";

import useAppointmentService from "../../services/AppointmentService";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

import "./modal.scss";

interface IModalProps {
	selectedId: number;
	isOpen: boolean;
	handleClose: (state: boolean) => void;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	const cancelStatusRef = useRef<boolean | null>(null);

	const { cancelAppointment } = useAppointmentService();
	const { getAllActiveAppointments, getAllAppointments } =
		useContext(AppointmentsContext);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelAppointment(id)
			.then(() => {
				setCancelStatus(true);
			})
			.catch(() => {
				setCancelStatus(false);
				setBtnDisabled(false);
			});
	};

	const onEscClose = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	const closeModal = () => {
		handleClose(false);
		if (cancelStatus || cancelStatusRef.current) {
			getAllActiveAppointments();
			getAllAppointments();
		}
	};

	useEffect(() => {
		cancelStatusRef.current = cancelStatus;
	}, [cancelStatus]);

	useEffect(() => {
		window.addEventListener("keydown", onEscClose);
		return () => {
			window.removeEventListener("keydown", onEscClose);
		};
	}, [handleClose]);

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 500, exit: 500 }}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div
					className="modal"
					ref={nodeRef}
					onClick={(e) => {
						if (
							e.target instanceof HTMLElement &&
							e.target.classList.contains("modal")
						) {
							closeModal();
						}
					}}
				>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? #
							{selectedId}
						</span>
						<div className="modal__btns">
							<button
								className="modal__ok"
								disabled={btnDisabled}
								onClick={() =>
									handleCancelAppointment(selectedId)
								}
							>
								Ok
							</button>
							<button
								className="modal__close"
								onClick={() => closeModal()}
							>
								Close
							</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null
								? ""
								: cancelStatus
								? "Success"
								: "Error, pls try again"}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
