import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { withRouter, useParams, Redirect } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import themeHelper from "../Helper/ThemeHelper";
import cityService from "../Services/CityService";
import ForecastItem from "./CardItems/ForecastItem";

function CityDetails(props) {
	const [daily, setDaily] = useState(null);
	const [hourly, setHourly] = useState(null);
	const [message, setMessage] = useState(null);
	const cityId = useParams().cityid;
	const authContext = useContext(AuthContext);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		//get info on the city
		if (cityId !== undefined) {
			cityService.getCity(cityId).then((data) => {
				if (data.msgError) {
					setMessage(data.message);
				} else {
					setDaily(data.city.daily);
					setHourly(data.city.hourly);
				}
			});
		}
	}, [cityId]);

	if (authContext.isAuthenticated === false) {
		return <Redirect to="/login" />;
	} else {
		return (
			<Container fluid>
				{message ? (
					<Row className="justify-content-center">
						<h3 className="text-danger">{message}</h3>
					</Row>
				) : (
					<div>
						<Row
							className="justify-content-center"
							style={{ marginTop: "2em" }}
						>
							<h1 className={`${themeHelper.textTheme(theme)}`}>
								Daily Forecast
							</h1>
						</Row>
						{daily ? (
							<Row className="flex-row flex-nowrap overflow-auto">
								{daily.map((forecast, i) => {
									return (
										<Col
											key={i}
											style={{
												marginTop: "1.5em",
												marginBottom: "1.5em",
											}}
										>
											<ForecastItem forecast={forecast} />
										</Col>
									);
								})}
							</Row>
						) : (
							<Row className="justify-content-center">
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</Row>
						)}
					</div>
				)}
			</Container>
		);
	}
}

export default withRouter(CityDetails);
