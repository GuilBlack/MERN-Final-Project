import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router";
import CloudsLight from "../../Images/cloudy_dark.png";
import ClearLight from "../../Images/sunny_dark.png";
import RainLight from "../../Images/raining_dark.png";
import SnowLight from "../../Images/snowing_dark.png";
import StormLight from "../../Images/storm_dark.png";

import CloudsDark from "../../Images/cloudy_light.png";
import ClearDark from "../../Images/sunny_light.png";
import RainDark from "../../Images/raining_light.png";
import SnowDark from "../../Images/snowing_light.png";
import StormDark from "../../Images/storm_light.png";

function CityItem(props) {
	const forecast = props.forecast;
	console.log(props.forecast);
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saterday",
	];
	const date = new Date(forecast.dt * 1000);

	const checkWeather = () => {
		if (forecast.weather[0].main === "Clear") {
			return ClearLight;
		} else if (forecast.weather[0].main === "Clouds") {
			return CloudsLight;
		} else if (
			forecast.weather[0].main === "Rain" ||
			forecast.weather[0].main === "Drizzle" ||
			forecast.weather[0].main === "Haze" ||
			forecast.weather[0].main === "Mist"
		) {
			return RainLight;
		} else if (forecast.weather[0].main === "Snow") {
			return SnowLight;
		} else {
			return StormLight;
		}
	};

	return (
		<Card
			style={{ width: "20em", height: "30em" }}
			className="bg-dark text-light"
		>
			<Card.Header className="font-weight-bold">
				{`${days[date.getDay()]}, ${date.toDateString().substr(4)}`}
			</Card.Header>
			<div
				style={{
					width: "100%",
					textAlign: "center",
					marginTop: "1em",
				}}
			>
				<Card.Img
					src={checkWeather()}
					style={{
						fill: "white",
						width: "15em",
						marginTop: "-4em",
					}}
				/>
				<Card.Title
					className="font-weight-bold text-primary"
					style={{ fontSize: "2em" }}
				>
					{`${
						Math.round(
							((forecast.temp.day +
								forecast.temp.night +
								forecast.temp.morn +
								forecast.temp.eve) /
								4) *
								100
						) / 100
					}\u00B0`}
				</Card.Title>
			</div>
			<Card.Text>
				<div
					className="text-success"
					style={{
						float: "left",
						marginLeft: "1em",
						fontSize: "1.5em",
						textAlign: "center",
					}}
				>
					<div>&#9660;</div>
					<div>{`${forecast.temp.min}\u00B0`}</div>
					<div>Min</div>
				</div>
				<div
					className="text-danger"
					style={{
						float: "right",
						marginRight: "1em",
						fontSize: "1.5em",
						textAlign: "center",
					}}
				>
					<div>&#9650;</div>
					<div>{`${forecast.temp.max}\u00B0`}</div>
					<div>Max</div>
				</div>
			</Card.Text>
		</Card>
	);
}

export default withRouter(CityItem);
