import {
	ActiveAppointment,
	IAppointment,
} from "../../shared/interfaces/appointment.interface";
import { IAppointmentAction, ActionTypes } from "./actions";

export interface IInitialState {
	allAppointments: IAppointment[] | [];
	activeAppointments: ActiveAppointment[] | [];
}

export default function reducer(
	state: IInitialState,
	action: IAppointmentAction
) {
	switch (action.type) {
		case ActionTypes.SET_ALL_APPOINTMENTS:
			return { ...state, allAppointments: action.payload };
		case ActionTypes.SET_ACTIVE_APPOINTMENTS:
			return { ...state, activeAppointments: action.payload };
		default:
			return state;
	}
}
