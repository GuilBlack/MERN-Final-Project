import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
	<Container>
		<h1>404 - Not Found!</h1>
		<Link to="/">Go Home</Link>
	</Container>
);

export default NotFound;
