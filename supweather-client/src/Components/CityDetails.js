import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { withRouter, useParams, Redirect } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import cityService from "../Services/CityService";
import ForecastItem from "./CardItems/ForecastItem";

function CityDetails(props) {
	console.log(useParams().cityid);
	const [daily, setDaily] = useState(null);
	const [hourly, setHourly] = useState(null);
	const [message, setMessage] = useState(null);
	const cityId = useParams().cityid;
	const authContext = useContext(AuthContext);

	useEffect(() => {
		console.log("hello");
		if (cityId !== undefined) {
			cityService.getCity(cityId).then((data) => {
				if (data.msgError) {
					setMessage(data.message);
				} else {
					console.log(data.city);
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
						<Row className="justify-content-center">
							<h3>Daily Forecast</h3>
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
