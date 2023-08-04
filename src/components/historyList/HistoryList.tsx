import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import CancelModal from "../modal/CancelModal";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import { useCallback, useContext, useEffect, useState } from "react";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {
	const { appointmentsLoadingStatus, allAppointments, getAllAppointments } =
		useContext(AppointmentsContext);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedId, selectId] = useState<number>(0);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	useEffect(() => {
		getAllAppointments();
	}, []);

	switch (appointmentsLoadingStatus) {
		case "loading":
			return <Spinner />;
		case "error":
			return (
				<>
					<Error />
					<button
						className="schedule__reload"
						onClick={getAllAppointments}
					>
						Try to reload data
					</button>
				</>
			);
	}

	return (
		<>
			{allAppointments
				.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
				.map((item) => {
					return (
						<AppointmentItem
							openModal={handleOpenModal}
							displayTimeLeft={false}
							{...item}
							key={item.id}
						/>
					);
				})}
			<CancelModal
				isOpen={isOpen}
				selectedId={selectedId}
				handleClose={setIsOpen}
			/>
		</>
	);
}

export default HistoryList;
