import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authService from "../Services/AuthService";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

function Login(props) {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState(null);
	const [validated, setValidated] = useState(false);
	const authContext = useContext(AuthContext);

	const onSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			authService.login(user).then((data) => {
				const { isAuthenticated, user } = data;
				if (isAuthenticated) {
					authContext.setUser(user);
					authContext.setIsAuthenticated(isAuthenticated);
				} else {
					document
						.getElementById("username")
						.setCustomValidity("Invalid field.");
					document
						.getElementById("password")
						.setCustomValidity("Invalid field.");
					setMessage("Your username or password is incorrect.");
				}
			});
		}
		setValidated(true);
	};

	const onChange = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	if (authContext.isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<Container>
				<Form
					noValidate
					validated={validated}
					onSubmit={onSubmit}
					id="loginForm"
				>
					<h2>Sign in</h2>
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							required
							type="text"
							name="username"
							placeholder="Enter username"
							onChange={onChange}
						/>
						<Form.Control.Feedback type="invalid">
							Please enter a valid username
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							name="password"
							onChange={onChange}
							placeholder="Enter password"
						/>
						<Form.Control.Feedback type="invalid">
							Please enter a valid password
						</Form.Control.Feedback>
					</Form.Group>
					<Button variant="primary" type="submit">
						Login
					</Button>
					<Form.Text className="text-danger">
						{message ? message : null}
					</Form.Text>
					<Form.Text className="text-muted">
						Not registered yet? Please click{" "}
						<Link to="/register">
							<span className="link-success">here</span>
						</Link>
						!
					</Form.Text>
				</Form>
			</Container>
		);
	}
}

export default Login;
