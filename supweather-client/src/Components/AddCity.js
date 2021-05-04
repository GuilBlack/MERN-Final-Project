import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddCity(props) {
	const authContext = useContext(AuthContext);
	const [message, setMessage] = useState(null);
	const [validated, setValidated] = useState(false);

	const onSubmit = (event) => {};

	const onChange = (event) => {};

	if (!authContext.isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<div>
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
				</Form>
			</div>
		);
	}
}

export default AddCity;
