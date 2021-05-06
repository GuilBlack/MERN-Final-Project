import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authService from "../Services/AuthService";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import themeHelper from "../Helper/ThemeHelper";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../MERN-Logo.png";

function NavBar(props) {
	const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
		AuthContext
	);

	const { theme, setTheme } = useContext(ThemeContext);

	const logout = () => {
		authService.logout().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(false);
			}
		});
	};

	const authButtons = () => {
		return (
			<Navbar.Text>
				<Link to="/login">
					<Button variant="outline-success" type="button">
						Login
					</Button>
				</Link>
				{"\u00A0\u00A0"}

				<Link to="/register">
					<Button variant="info" type="button">
						Register
					</Button>
				</Link>
			</Navbar.Text>
		);
	};

	const displayUser = () => {
		return (
			<Navbar.Text>
				{user.username}
				{"  "}
				<Button variant="outline-danger" type="button" onClick={logout}>
					Logout
				</Button>
			</Navbar.Text>
		);
	};

	const changeTheme = () => {
		if (theme === "dark") {
			setTheme("light");
			localStorage.setItem("theme", "light");
			document.querySelector("#light").style.display = "none";
			document.querySelector("#dark").style.display = "";
		} else {
			setTheme("dark");
			localStorage.setItem("theme", "dark");
			document.querySelector("#dark").style.display = "none";
			document.querySelector("#light").style.display = "";
		}
		console.log(localStorage.getItem("theme"));
	};

	return (
		<Navbar className={`${themeHelper.navbarTheme(theme)}`} expand="lg">
			<Link to="/">
				<Navbar.Brand>
					<img
						src={logo}
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="Supweather logo"
					/>
					{"  "}
					<span className="text-success">Sup</span>
					<span className="text-primary">weather</span>
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse
				id="basic-navbar-nav"
				className="justify-content-end"
			>
				<button
					type="button"
					id="lightDark"
					className="no-style-button"
					onClick={changeTheme}
				>
					<span
						className="material-icons"
						id="light"
						style={{
							marginTop: "7px",
							fontSize: "25px",
							color: "#e5e5e5",
						}}
					>
						light_mode
					</span>
					<span
						className="material-icons"
						id="dark"
						style={{
							marginTop: "7px",
							fontSize: "25px",
							color: "#343a40",
							display: "none",
						}}
					>
						dark_mode
					</span>
				</button>
				{isAuthenticated ? displayUser() : authButtons()}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
