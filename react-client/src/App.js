import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main/index";
import Signup from "./pages/Register/index"
import Login from "./pages/Login/index";
import './app.css';

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
