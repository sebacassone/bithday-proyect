import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ViewMessages from "./pages/index";
import SendInvitations from "./pages/InvitationPage";
import SwitchStatus from "./pages/AdministrationPage";

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/mostrar-encantamiento" element={<ViewMessages />} />
				<Route path="/" element={<SendInvitations />} />
				<Route path="/cambiar-estado" element={<SwitchStatus />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
