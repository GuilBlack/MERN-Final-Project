import React, { createContext, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (
			localStorage.getItem("theme") === null ||
			localStorage.getItem("theme") === undefined
		) {
			localStorage.setItem("theme", "dark");
		}
		console.log(localStorage.getItem("theme"));
		setTheme(localStorage.getItem("theme"));
	}, []); //sets the theme when app launches

	return (
		<div>
			{!theme ? (
				<Container className="justify-content-center">
					<Row className="justify-content-center">
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</Row>
				</Container>
			) : (
				<ThemeContext.Provider //provide theme to children elements
					value={{
						theme,
						setTheme,
					}}
				>
					{children}
				</ThemeContext.Provider>
			)}
		</div>
	);
};

export default ThemeProvider;
