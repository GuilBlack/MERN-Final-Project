import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Container>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
					</Switch>
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
