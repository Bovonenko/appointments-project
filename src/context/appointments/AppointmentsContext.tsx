import React, { createContext, useEffect, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import useAppointmentService from "../../services/AppointmentService";
import { ActionTypes } from "./actions";

const initialState: IInitialState = {
	allAppointments: [],
	activeAppointments: [],
};

interface AppointmentsContextValue extends IInitialState {
	getAllActiveAppointments: () => void;
	getAllAppointments: () => void;
}

interface ProviderProps {
	children?: React.ReactNode;
}

export const AppointmentsContext = createContext<AppointmentsContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	getAllActiveAppointments: () => {},
	getAllAppointments: () => {},
});

const AppointmentsContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: AppointmentsContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		getAllAppointments: () => {
			getAllAppointments().then((res) => {
				dispatch({
					type: ActionTypes.SET_ALL_APPOINTMENTS,
					payload: res,
				});
			});
		},
		getAllActiveAppointments: () => {
			getAllActiveAppointments().then((res) => {
				dispatch({
					type: ActionTypes.SET_ACTIVE_APPOINTMENTS,
					payload: res,
				});
			});
		},
	};

	return (
		<AppointmentsContext.Provider value={value}>
			{children}
		</AppointmentsContext.Provider>
	);
};

export default AppointmentsContextProvider;
