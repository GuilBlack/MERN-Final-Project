import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { withRouter } from "react-router-dom";
import cityService from "../Services/CityService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import countryList from "../Data/CountryHelper";
import { Container } from "react-bootstrap";

function AddCity(props) {
	const authContext = useContext(AuthContext);
	const [city, setCity] = useState({ cityname: null, countrycode: "AF" });
	const [cityMessage, setCityWarning] = useState(null);
	const [message, setMessage] = useState(null);
	const [validated, setValidated] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			let inputCityName = document.getElementById("cityname");

			if (inputCityName.validity.valueMissing) {
				setCityWarning("Enter a city name.");
				event.target.setCustomValidity("Invalid Input.");
			} else {
				setCityWarning(null);
				inputCityName.setCustomValidity("");
			}
			event.stopPropagation();
		} else {
			cityService.addCity(city).then((data) => {
				if (data.msgError) {
					setMessage(data.message);
				} else {
					props.history.push("/");
				}
			});
			setValidated(true);
		}
	};

	const onChange = (event) => {
		if (event.target.name === "cityname") {
			if (event.target.validity.valueMissing) {
				setCityWarning("Enter a city name.");
				event.target.setCustomValidity("Invalid Input.");
			} else {
				setCityWarning(null);
				event.target.setCustomValidity("");
			}
		}

		setCity({ ...city, [event.target.name]: event.target.value });
	};

	if (!authContext.isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<Container>
				<Form
					noValidate
					validated={validated}
					onSubmit={onSubmit}
					id="addCityForm"
				>
					<h2>Add a city</h2>
					<Form.Group controlId="cityname">
						<Form.Label>City Name</Form.Label>
						<Form.Control
							required
							type="text"
							name="cityname"
							placeholder="Enter a city name"
							onChange={onChange}
						/>
						<Form.Text className="text-danger">
							{cityMessage ? cityMessage : null}
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="formGridCountry">
						<Form.Label>Country</Form.Label>
						<Form.Control
							as="select"
							name="countrycode"
							onChange={onChange}
							defaultValue={"AF"}
						>
							{countryList.map((country, i) => {
								return (
									<option key={i} value={country.Code}>
										{country.Name}
									</option>
								);
							})}
						</Form.Control>
					</Form.Group>
					<Button variant="primary" type="submit" onSubmit={onSubmit}>
						Add
					</Button>
					<Form.Text className="text-danger">
						{message ? message : null}
					</Form.Text>
				</Form>
			</Container>
		);
	}
}

export default withRouter(AddCity);
