import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
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
			</Router>
		</div>
	);
}

export default App;
