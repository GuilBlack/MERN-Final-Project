const axios = require("axios").default;

const cityService = {
	getCities: () => {
		return axios
			.get("/city/get-cities")
			.then((res) => res.data)
			.catch((err) => err.response.data);
	},
};
