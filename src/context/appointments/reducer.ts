import {
	ActiveAppointment,
	IAppointment,
} from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

import { LoadingStatusOptions } from "../../hooks/http.hook";
import { AppointmentAction, ActionTypes } from "./actions";

export interface IAppointmentsState {
	allAppointments: IAppointment[] | [];
	activeAppointments: ActiveAppointment[] | [];
	appointmentsLoadingStatus: LoadingStatusOptions;
	calendarDate: LooseValue;
}

export default function reducer(
	state: IAppointmentsState,
	action: AppointmentAction
): IAppointmentsState {
	switch (action.type) {
		case ActionTypes.SET_ALL_APPOINTMENTS:
			return {
				...state,
				allAppointments: action.payload,
				appointmentsLoadingStatus: "idle",
			};
		case ActionTypes.SET_ACTIVE_APPOINTMENTS:
			return {
				...state,
				activeAppointments: action.payload,
				appointmentsLoadingStatus: "idle",
			};
		case ActionTypes.FETCHING_APPOINTMENTS:
			return { ...state, appointmentsLoadingStatus: "loading" };
		case ActionTypes.ERROR_FETCHING_APPOINTMENTS:
			return { ...state, appointmentsLoadingStatus: "error" };
		case ActionTypes.SET_CALENDAR_DATE:
			return { ...state, calendarDate: action.payload };
		default:
			return state;
	}
}
