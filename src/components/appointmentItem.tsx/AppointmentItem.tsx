import { useEffect, useState } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";
import { Optional } from "utility-types";

import "./appointmentItem.scss";

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type AppointmentProps = Optional<IAppointment, "canceled">;

function AppointmentItem({
	id,
	name,
	phone,
	service,
	date,
	canceled,
}: AppointmentProps) {
	const [timeLeft, changeTimeLeft] = useState<string | null>(null);

	useEffect(() => {
		changeTimeLeft(
			`${dayjs(date).diff(undefined, "h")}:${
				dayjs(date).diff(undefined, "m") % 60
			}`
		);

		const intervalId = setInterval(() => {
			changeTimeLeft(
				`${dayjs(date).diff(undefined, "h")}:${
					dayjs(date).diff(undefined, "m") % 60
				}`
			);
		}, 60000);
		return () => {
			clearInterval(intervalId);
		};
	}, [date]);

	const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");
	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			{!canceled ? (
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button className="appointment__cancel">Cancel</button>
				</>
			) : null}
			{canceled ? (
				<div className="appointment__canceled">Canceled</div>
			) : null}
		</div>
	);
}

export default AppointmentItem;
