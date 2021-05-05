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
	const [city, setCity] = useState(props.city);
	console.log(props.city);
	console.log(city.weather[0].main);

	// useState(() => {
	// 	setCity(props.city);
	// 	console.log(city);
	// 	console.log(city.weather[0].main);
	// }, []);

	const checkWeather = () => {
		if (city.weather[0].main === "Clear") {
			return ClearLight;
		} else if (city.weather[0].main === "Clouds") {
			return CloudsLight;
		} else if (
			city.weather[0].main === "Rain" ||
			city.weather[0].main === "Drizzle" ||
			city.weather[0].main === "Haze" ||
			city.weather[0].main === "Mist"
		) {
			return RainLight;
		} else if (city.weather[0].main === "Snow") {
			return SnowLight;
		} else {
			return StormLight;
		}
	};

	return (
		<Card
			style={{ width: "20em", height: "30em" }}
			className="bg-dark text-light"
			onClick={() =>
				props.history.push({
					pathname: `/city-details/${city.id}`,
				})
			}
		>
			<Card.Header className="font-weight-bold">{`${city.name}, ${city.sys.country}`}</Card.Header>
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
					{`${city.main.temp}\u00B0`}
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
					<div>{`${city.main.temp_min}\u00B0`}</div>
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
					<div>{`${city.main.temp_max}\u00B0`}</div>
					<div>Max</div>
				</div>
			</Card.Text>
		</Card>
	);
}

export default withRouter(CityItem);
