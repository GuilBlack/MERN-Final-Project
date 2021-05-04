import React from "react";
import { withRouter, useParams } from "react-router";

function CityDetails(props) {
	console.log(useParams().cityid);
	return (
		<h1>
			Lat: {useParams().cityid}, Lon: {useParams().cityid}
		</h1>
	);
}

export default withRouter(CityDetails);
