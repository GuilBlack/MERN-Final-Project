import React, { useContext, useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";
import cityService from "../Services/CityService";
import { withRouter } from "react-router-dom";
import AddLight from "../Images/add_icon_light.svg";
import AddDark from "../Images/add_icon_light.svg";
import CityItem from "./CityItem";

function Home(props) {
	const [cities, setCities] = useState(null);
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);
	console.log(authContext.isAuthenticated);

	useEffect(() => {
		cityService.getCities().then((data) => {
			if (data.msgError) {
				setMessage(data.message);
			} else {
				setCities(data.cities);
				console.log(data.cities);
			}
		});
	}, []);

	if (!authContext.isAuthenticated) {
		return (
			<Container>
				<h1>
					Hello gents and ladies! You must have an account to access
					lots of wonderful features :3
				</h1>
			</Container>
		);
	} else {
		return (
			<Container>
				<Row className="justify-content-center">
					<h1>Today</h1>
				</Row>
				{message ? (
					<Row className="justify-content-center">
						<h3 className="text-alert">{message}</h3>
					</Row>
				) : null}
				<Row>
					<Col style={{ marginTop: "1.5em", marginBottom: "1.5em" }}>
						<Card
							style={{ width: "20em", height: "30em" }}
							className="bg-dark text-light"
							onClick={() => props.history.push("/add-city")}
						>
							<Card.Header>Add a City</Card.Header>
							<div
								style={{
									width: "100%",
									textAlign: "center",
									marginTop: "1em",
								}}
							>
								<Card.Img
									src={AddLight}
									style={{
										fill: "white",
										width: "15em",
									}}
								/>
							</div>
						</Card>
					</Col>
					{cities
						? cities.map((e, i) => {
								return (
									<Col
										key={i}
										style={{
											marginTop: "1.5em",
											marginBottom: "1.5em",
										}}
									>
										<CityItem city={e} />
									</Col>
								);
						  })
						: null}
				</Row>
			</Container>
		);
	}
}

export default withRouter(Home);
