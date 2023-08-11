import React, { createContext, useReducer } from "react";
import reducer, { IAppointmentsState } from "./reducer";
import { Value } from "react-calendar/dist/cjs/shared/types";
import useAppointmentService from "../../services/AppointmentService";
import { ActionTypes } from "./actions";
import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";

const initialState: IAppointmentsState = {
	allAppointments: [],
	activeAppointments: [],
	appointmentsLoadingStatus: "idle",
	calendarDate: [null, null],
};

interface AppointmentsContextValue extends IAppointmentsState {
	getAllActiveAppointments: () => void;
	getAllAppointments: () => void;
	setDateAndFilter: (newDate: Value) => void;
}

interface ProviderProps {
	children?: React.ReactNode;
}

function filterData<T extends ActiveAppointment>(
	data: T[],
	state: IAppointmentsState
) {
	return data.filter((item) => {
		if (
			Array.isArray(state.calendarDate) &&
			state.calendarDate[0] &&
			state.calendarDate[1]
		) {
			if (
				new Date(item.date).getTime() >=
					new Date(state.calendarDate[0]).getTime() &&
				new Date(item.date).getTime() <=
					new Date(state.calendarDate[1]).getTime()
			) {
				return item;
			}
		} else {
			return item;
		}
	});
}

export const AppointmentsContext = createContext<AppointmentsContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentsLoadingStatus: initialState.appointmentsLoadingStatus,
	calendarDate: initialState.calendarDate,
	getAllActiveAppointments: () => {},
	getAllAppointments: () => {},
	setDateAndFilter: (newDate: Value) => {},
});

const AppointmentsContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: AppointmentsContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentsLoadingStatus: loadingStatus,
		calendarDate: state.calendarDate,
		getAllAppointments: () => {
			getAllAppointments()
				.then((data) => {
					dispatch({
						type: ActionTypes.SET_ALL_APPOINTMENTS,
						payload: filterData(data, state),
					});
				})
				.catch(() => {
					dispatch({ type: ActionTypes.ERROR_FETCHING_APPOINTMENTS });
				});
		},
		getAllActiveAppointments: () => {
			getAllActiveAppointments()
				.then((data) => {
					dispatch({
						type: ActionTypes.SET_ACTIVE_APPOINTMENTS,
						payload: filterData(data, state),
					});
				})
				.catch(() => {
					dispatch({ type: ActionTypes.ERROR_FETCHING_APPOINTMENTS });
				});
		},
		setDateAndFilter: (newDate: Value) => {
			dispatch({ type: ActionTypes.SET_CALENDAR_DATE, payload: newDate });
		},
	};

	return (
		<AppointmentsContext.Provider value={value}>
			{children}
		</AppointmentsContext.Provider>
	);
};

export default AppointmentsContextProvider;
