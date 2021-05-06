import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CityDetails from "./Components/CityDetails";
import AddCity from "./Components/AddCity";
import NotFound from "./Components/NotFound";
import { ThemeContext } from "./Contexts/ThemeContext";
import themeHelper from "./Helper/ThemeHelper";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Styles/App.css";
import "./Styles/App.scss";
import { Helmet } from "react-helmet";
import Delete from "./Components/Delete";

function App() {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="App">
			<Helmet>
				<style>{themeHelper.bodyTheme(theme)}</style>
			</Helmet>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/city-details/:cityid">
						<CityDetails />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/add-city">
						<AddCity />
					</Route>
					<Route exact path="/delete">
						<Delete />
					</Route>
					<Route exact path="*" component={NotFound} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
