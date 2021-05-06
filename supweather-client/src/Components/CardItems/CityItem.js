import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router";
import { ThemeContext } from "../../Contexts/ThemeContext";
import themeHelper from "../../Helper/ThemeHelper";
import cityService from "../../Services/CityService";
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
	const city = props.city;
	const { theme } = useContext(ThemeContext);

	const checkWeather = () => {
		if (city.weather[0].main === "Clear") {
			return themeHelper.chooseImage(theme, ClearLight, ClearDark);
		} else if (city.weather[0].main === "Clouds") {
			return themeHelper.chooseImage(theme, CloudsLight, CloudsDark);
		} else if (
			city.weather[0].main === "Rain" ||
			city.weather[0].main === "Drizzle" ||
			city.weather[0].main === "Haze" ||
			city.weather[0].main === "Mist"
		) {
			return themeHelper.chooseImage(theme, RainLight, RainDark);
		} else if (city.weather[0].main === "Snow") {
			return themeHelper.chooseImage(theme, SnowLight, SnowDark);
		} else {
			return themeHelper.chooseImage(theme, StormLight, StormDark);
		}
	};

	const onDelete = () => {
		console.log(city);
		cityService.deleteCity(city.id).then((data) => {
			if (data.msgError) {
				props.setMessage(data.message);
			} else {
				props.history.push("/delete");
			}
		});
	};

	return (
		<Card
			style={{ width: "23em", height: "38em", margin: "auto" }}
			className={`${themeHelper.cardTheme(theme)}`}
		>
			<Card.Header
				className={`font-weight-bold ${themeHelper.textTheme(theme)}`}
			>
				{`${city.name}, ${city.sys.country}`}{" "}
				<span
					style={{
						float: "right",
						fontSize: "25px",
						color: "red",
						cursor: "pointer",
					}}
					className="material-icons"
					onClick={onDelete}
				>
					delete_forever
				</span>
			</Card.Header>
			<div
				style={{ cursor: "pointer" }}
				onClick={() =>
					props.history.push({
						pathname: `/city-details/${city.id}`,
					})
				}
			>
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
						style={{ fontSize: "4em" }}
					>
						{`${city.main.temp}\u00B0`}
					</Card.Title>
				</div>
				<Card.Text style={{ marginTop: "2em" }}>
					<div
						className="text-success"
						style={{
							float: "left",
							marginLeft: "1em",
							fontSize: "2em",
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
							fontSize: "2em",
							textAlign: "center",
						}}
					>
						<div>&#9650;</div>
						<div>{`${city.main.temp_max}\u00B0`}</div>
						<div>Max</div>
					</div>
				</Card.Text>
			</div>
		</Card>
	);
}

export default withRouter(CityItem);
