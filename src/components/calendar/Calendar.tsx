import { Calendar as LibCalendar } from "react-calendar";
import { useContext, useEffect } from "react";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";
import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentsContext);

	return (
		<div className="calendar">
			<LibCalendar
				onChange={(value) => {
					setDateAndFilter(value);
				}}
				value={calendarDate}
				selectRange
			/>
			<button
				className="calendar__reset"
				onClick={() => setDateAndFilter([null, null])}
			>
				Reset
			</button>
		</div>
	);
}

export default Calendar;
