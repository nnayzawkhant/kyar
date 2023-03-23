import React from "react";
import './main.css';

const Main = () => {
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main-wrapper">
			<nav className="navbar-wrapper">
				<h1>Myanmar Traditional Kyar Game</h1>
				<div>
					<button className="main-btn" onClick={handleLogout}>
						Logout
					</button>
					{user.name}
				</div>
			</nav>
			<div className="large-container">
				<div className="left">
					<h1>Hello</h1>
				</div>
			</div>
		</div>
	);
};

export default Main;