import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		activeAppointments,
		getAllActiveAppointments,
		appointmentsLoadingStatus,
	} = useContext(AppointmentsContext);

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
			{activeAppointments.map((item, i) => {
				return <AppointmentItem {...item} key={i} />;
			})}
		</>
	);
}

export default AppointmentList;
