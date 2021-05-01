import React, { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContext";

function App() {
	const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
		AuthContext
	);
	console.log(user);
	console.log(isAuthenticated);
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
