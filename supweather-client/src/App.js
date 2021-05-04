import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CityDetails from "./Components/CityDetails";
import AddCity from "./Components/AddCity";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/city-details/:cityid">
						<CityDetails />
					</Route>
					<Container>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/add-city">
							<AddCity />
						</Route>
					</Container>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
