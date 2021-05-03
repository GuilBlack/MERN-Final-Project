import React, { createContext, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import authService from "../Services/AuthService";
import { Row } from "react-bootstrap";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAppLoaded, setAppIsLoaded] = useState(false);

	useEffect(() => {
		authService.checkIfAuthenticated().then((data) => {
			setUser({ username: data.username });
			setIsAuthenticated(data.isAuthenticated);
			setAppIsLoaded(true);
		});
	}, []);

	return (
		<div>
			{!isAppLoaded ? (
				<Container className="justify-content-center">
					<Row className="justify-content-center">
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</Row>
				</Container>
			) : (
				<AuthContext.Provider
					value={{
						user,
						setUser,
						isAuthenticated,
						setIsAuthenticated,
					}}
				>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
};

export default AuthProvider;
