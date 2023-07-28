import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const { activeAppointments, getAllActiveAppointments } =
		useContext(AppointmentsContext);

	useEffect(() => {
		getAllActiveAppointments();
	}, []);
	console.log(activeAppointments);

	return (
		<>
			{activeAppointments.map((item, i) => {
				return <AppointmentItem {...item} key={i} />;
			})}
		</>
	);
}

export default AppointmentList;
