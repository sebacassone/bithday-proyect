import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ViewMessages from "./pages/index";
import SendInvitations from "./pages/InvitationPage";

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ViewMessages />} />
				<Route path="/invitations" element={<SendInvitations />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
