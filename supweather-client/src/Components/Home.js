import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function Home(props) {
	const authContext = useContext(AuthContext);

	if (authContext.isAuthenticated) {
		return <h1>Today</h1>;
	} else {
		return (
			<h1>
				You please login to have access to a lot of wonderfull features
				:)
			</h1>
		);
	}
}

export default Home;
