import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authService from "../Services/AuthService";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { Redirect, withRouter } from "react-router-dom";

function Register(props) {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState(null);
	const [usernameWarning, setUsernameWarning] = useState(null);
	const [passwordWarning, setPassworrdWarning] = useState(null);
	const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(null);
	const [validated, setValidated] = useState(false);
	const authContext = useContext(AuthContext);

	const onSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			checkInputValidity("username");
			checkInputValidity("password");
			checkInputValidity("confirmPassword");

			event.stopPropagation();
		} else {
			authService.register(user).then((data) => {
				if (!data.msgError) {
					authService.login(user).then((d) => {
						const { isAuthenticated, user } = d;

						if (isAuthenticated) {
							authContext.setUser(user);
							authContext.setIsAuthenticated(isAuthenticated);
						} else {
							props.history.push("/login");
						}
					});
				} else {
					document
						.getElementById("username")
						.setCustomValidity("Invalid field.");
					setMessage(data.message);
				}
			});
		}
		setValidated(true);
	};

	const onChange = (event) => {
		if (event.target.name === "username") {
			checkInputValidity("username");
		}
		if (event.target.name === "password") {
			checkInputValidity("password");
		}
		if (event.target.name === "confirmPassword") {
			checkInputValidity("confirmPassword");
		}

		if (event.target.name !== "confirmPassword") {
			setUser({ ...user, [event.target.name]: event.target.value });
		}
		console.log(user);
	};

	const checkInputValidity = (inputName) => {
		if (inputName === "username") {
			let usernameInput = document.getElementById("username");
			if (usernameInput.validity.valueMissing) {
				setUsernameWarning("Enter a username.");
				usernameInput.setCustomValidity("Invalid field.");
			} else if (
				usernameInput.validity.tooShort ||
				usernameInput.validity.tooLong
			) {
				setUsernameWarning(
					"Your username must be between 3 and 16 characters."
				);
				usernameInput.setCustomValidity("Invalid field.");
			} else {
				setUsernameWarning(null);
				usernameInput.setCustomValidity("");
			}
		}

		if (inputName === "password") {
			let passwordInput = document.getElementById("password");
			if (passwordInput.validity.valueMissing) {
				setPassworrdWarning("Enter a password.");
				passwordInput.setCustomValidity("Invalid field.");
			} else if (passwordInput.validity.tooShort) {
				setPassworrdWarning(
					"Your password must be more than 8 characters."
				);
				passwordInput.setCustomValidity("Invalid field.");
			} else {
				setPassworrdWarning(null);
				passwordInput.setCustomValidity("");
			}
		}

		if (inputName === "confirmPassword") {
			let confirmPasswordInput = document.getElementById(
				"confirmPassword"
			);
			let passwordInput = document.getElementById("password");
			if (confirmPasswordInput.validity.valueMissing) {
				setConfirmPasswordWarning("Enter a password confirmation.");
				confirmPasswordInput.setCustomValidity("Invalid field.");
			} else if (confirmPasswordInput.value !== passwordInput.value) {
				setConfirmPasswordWarning(
					"Your password and password confirmation aren't matching."
				);
				confirmPasswordInput.setCustomValidity("Invalid field.");
			} else {
				setConfirmPasswordWarning(null);
				confirmPasswordInput.setCustomValidity("");
			}
		}
	};

	if (authContext.isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<div>
				<Form
					noValidate
					validated={validated}
					onSubmit={onSubmit}
					id="registerForm"
				>
					<h2>Register</h2>
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							required
							minLength="3"
							maxLength="16"
							type="text"
							name="username"
							placeholder="Enter username"
							onChange={onChange}
						/>
						<Form.Text className="text-danger">
							{usernameWarning}
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							minLength="8"
							type="password"
							name="password"
							onChange={onChange}
							placeholder="Enter password"
						/>
						<Form.Text className="text-danger">
							{passwordWarning}
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							required
							type="password"
							name="confirmPassword"
							onChange={onChange}
							placeholder="Enter password"
						/>
						<Form.Text className="text-danger">
							{confirmPasswordWarning}
						</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Register
					</Button>
					<Form.Text className="text-danger">
						{message ? message : null}
					</Form.Text>
					<Form.Text className="text-muted">
						Already have an account? Please click{" "}
						<Link to="/login">
							<span className="link-success">here</span>
						</Link>
						!
					</Form.Text>
				</Form>
			</div>
		);
	}
}

export default withRouter(Register);
