import { useEffect, useState, memo } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";
import { Optional } from "utility-types";

import "./appointmentItem.scss";

type AppointmentProps = Optional<IAppointment, "canceled"> & {
	openModal: (id: number) => void;
	getAllActiveAppointments?: () => void;
	displayTimeLeft?: boolean;
};

const AppointmentItem = memo(
	({
		id,
		name,
		phone,
		service,
		date,
		canceled,
		openModal,
		getAllActiveAppointments,
		displayTimeLeft = true,
	}: AppointmentProps) => {
		const [timeLeft, changeTimeLeft] = useState<string | null>(null);

		useEffect(() => {
			if (dayjs(date).diff(undefined, "m") >= 0) {
				changeTimeLeft(
					`${dayjs(date).diff(undefined, "h")}:${
						dayjs(date).diff(undefined, "m") % 60
					}`
				);
			}

			const intervalId = setInterval(() => {
				if (dayjs(date).diff(undefined, "m") <= 0) {
					if (getAllActiveAppointments) {
						getAllActiveAppointments();
					}
					clearInterval(intervalId);
				} else {
					changeTimeLeft(
						`${dayjs(date).diff(undefined, "h")}:${
							dayjs(date).diff(undefined, "m") % 60
						}`
					);
				}
			}, 60000);
			return () => {
				clearInterval(intervalId);
			};
		}, [date]);

		const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");
		return (
			<div className="appointment">
				<div className="appointment__info">
					<span className="appointment__date">
						Date: {formattedDate}
					</span>
					<span className="appointment__name">Name: {name}</span>
					<span className="appointment__service">
						Service: {service}
					</span>
					<span className="appointment__phone">Phone: {phone}</span>
				</div>
				{!canceled && timeLeft ? (
					<>
						{displayTimeLeft ? (
							<div className="appointment__time">
								<span>Time left:</span>
								<span className="appointment__timer">
									{timeLeft}
								</span>
							</div>
						) : null}
						<button
							className="appointment__cancel"
							onClick={() => {
								openModal(id);
							}}
						>
							Cancel
						</button>
					</>
				) : null}
				{canceled ? (
					<div className="appointment__canceled">Canceled</div>
				) : null}
			</div>
		);
	}
);

export default AppointmentItem;
