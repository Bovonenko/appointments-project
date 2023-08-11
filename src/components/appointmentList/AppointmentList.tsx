import { useContext, useEffect, useState, useCallback } from "react";

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
		calendarDate,
		setDateAndFilter,
	} = useContext(AppointmentsContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState<number>(0);
	const isDateSelected = Array.isArray(calendarDate) && calendarDate[0];

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	useEffect(() => {
		getAllActiveAppointments();
	}, [calendarDate]);

	useEffect(() => {
		setDateAndFilter([null, null]);
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
	if (activeAppointments.length === 0 && isDateSelected)
		return <h2>No appointments for the selected date</h2>;
	return (
		<>
			{activeAppointments.map((item) => {
				return (
					<AppointmentItem
						{...item}
						openModal={handleOpenModal}
						getAllActiveAppointments={getAllActiveAppointments}
						key={item.id}
					/>
				);
			})}
			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	);
}

export default AppointmentList;
