import { useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		activeAppointments,
		getAllActiveAppointments,
		appointmentsLoadingStatus,
	} = useContext(AppointmentsContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState<number | null>(null);

	useEffect(() => {
		getAllActiveAppointments();
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
						onClick={getAllActiveAppointments}
					>
						Try to reload data
					</button>
				</>
			);
	}
	return (
		<>
			{activeAppointments.map((item) => {
				return (
					<AppointmentItem
						{...item}
						openModal={setIsOpen}
						selectId={() => selectId(item.id)}
						key={item.id}
					/>
				);
			})}
			{isOpen ? (
				<CancelModal handleClose={setIsOpen} selectedId={selectedId} />
			) : null}
		</>
	);
}

export default AppointmentList;
