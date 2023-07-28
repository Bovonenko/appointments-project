import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import AppointmentsContextProvider from "../../context/appointments/AppointmentsContext";

import "./app.scss";

function App() {
	return (
		<AppointmentsContextProvider>
			<main className="board">
				<Header />
				<SchedulePage />
				{/* <HistoryPage /> */}
				{/* <CancelModal /> */}
			</main>
		</AppointmentsContextProvider>
	);
}

export default App;
