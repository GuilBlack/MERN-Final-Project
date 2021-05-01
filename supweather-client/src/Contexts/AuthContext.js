import React, { createContext, useState, useEffect } from "react";
import authService from "../Services/AuthService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAppLoaded, setAppIsLoaded] = useState(false);

	useEffect(() => {
		authService.checkIfAuthenticated().then((data) => {
			setUser({ user: { username: data.username } });
			setIsAuthenticated(data.isAuthenticated);
			setAppIsLoaded(true);
		});
	}, []);

	return (
		<div>
			{!isAppLoaded ? (
				<h1>Loading...</h1>
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
