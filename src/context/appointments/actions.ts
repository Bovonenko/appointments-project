import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

export enum ActionTypes {
	SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
	SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
}

export type IAppointmentAction =
	| {
			type: ActionTypes.SET_ACTIVE_APPOINTMENTS;
			payload: ActiveAppointment[];
	  }
	| {
			type: ActionTypes.SET_ALL_APPOINTMENTS;
			payload: IAppointment[];
	  };
