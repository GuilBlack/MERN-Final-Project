import React, { useContext, useState, useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import themeHelper from "../Helper/ThemeHelper";
import cityService from "../Services/CityService";
import { withRouter } from "react-router-dom";
import AddLight from "../Images/add_icon_light.svg";
import AddDark from "../Images/add_icon_dark.svg";
import CityItem from "./CardItems/CityItem";

function Home(props) {
	const [cities, setCities] = useState(null);
	const [message, setMessage] = useState(null);
	const { theme } = useContext(ThemeContext);
	const authContext = useContext(AuthContext);
	console.log(authContext.isAuthenticated);

	useEffect(() => {
		if (authContext.isAuthenticated) {
			cityService.getCities().then((data) => {
				if (data.msgError) {
					setMessage(data.message);
				} else {
					setCities(data.cities);
					console.log(data.cities);
				}
			});
		}
	}, [authContext.isAuthenticated]);

	if (!authContext.isAuthenticated) {
		return (
			<Container>
				<h1 className={`${themeHelper.textTheme(theme)}`}>
					Hello gents and ladies! You must have an account to access
					lots of wonderful features :3
				</h1>
			</Container>
		);
	} else {
		return (
			<Container fluid>
				<div style={{ marginRight: "5em", marginLeft: "5em" }}>
					<Row
						className="justify-content-center"
						style={{ marginTop: "2em" }}
					>
						<h1 className={`${themeHelper.textTheme(theme)}`}>
							Today
						</h1>
					</Row>
					{message ? (
						<Row className="justify-content-center">
							<h3 className="text-danger">{message}</h3>
						</Row>
					) : null}
					<Row>
						<Col
							style={{
								marginTop: "1.5em",
								marginBottom: "1.5em",
							}}
						>
							<Card
								style={{
									width: "23em",
									height: "38em",
									margin: "auto",
									cursor: "pointer",
								}}
								className={`${themeHelper.cardTheme(theme)}`}
								onClick={() => props.history.push("/add-city")}
							>
								<Card.Header className="font-weight-bold">
									Add a City
								</Card.Header>
								<div
									style={{
										width: "100%",
										textAlign: "center",
										marginTop: "1em",
									}}
								>
									<Card.Img
										src={themeHelper.chooseImage(
											theme,
											AddLight,
											AddDark
										)}
										style={{
											fill: "white",
											width: "15em",
										}}
									/>
								</div>
							</Card>
						</Col>
						{cities ? (
							cities.map((e, i) => {
								return (
									<Col
										key={i}
										style={{
											marginTop: "1.5em",
											marginBottom: "1.5em",
											marginLeft: "1em",
										}}
									>
										<CityItem
											city={e}
											setMessage={setMessage}
										/>
									</Col>
								);
							})
						) : (
							<Col>
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</Col>
						)}
					</Row>
				</div>
			</Container>
		);
	}
}

export default withRouter(Home);
