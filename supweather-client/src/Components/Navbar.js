import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authService from "../Services/AuthService";
import { AuthContext } from "../Contexts/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../MERN-Logo.png";

function NavBar(props) {
	const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
		AuthContext
	);

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
				<Button
					variant="outline-danger"
					type="button"
					onClick={logout()}
				>
					Logout
				</Button>
			</Navbar.Text>
		);
	};

	return (
		<Navbar variant="dark" bg="dark" expand="lg">
			<Link to="/">
				<Navbar.Brand>
					<img
						src={logo}
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="Supweather logo"
					/>
					{"\u00A0\u00A0"}Supweather
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse
				id="basic-navbar-nav"
				className="justify-content-end"
			>
				{isAuthenticated ? displayUser() : authButtons()}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
