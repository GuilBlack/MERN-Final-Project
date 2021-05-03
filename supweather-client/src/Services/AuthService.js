const axios = require("axios").default;

const authService = {
	login: (user) => {
		return axios
			.post("/user/login", user)
			.then((res) => {
				console.log(res.data);
				return res.data;
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						console.log(err.response);
						return {
							isAuthenticated: false,
							user: null,
							message: err.response.data,
						};
					}
				}
			});
	},

	register: (user) => {
		return axios
			.post("/user/register", user)
			.then((res) => res.data)
			.catch((err) => {
				if (err.response) {
					return err.response.data;
				} else {
					return {
						message: "there was an error while contacting the API",
						msgError: true,
					};
				}
			});
	},

	logout: () => {
		return axios.get("/user/logout").then((res) => res.data);
	},

	checkIfAuthenticated: () => {
		return axios
			.get("/user/authenticated")
			.then((res) => {
				console.log("yes");
				console.log(res.data);
				return res.data;
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						console.log("yes");
						return { isAuthenticated: false, username: "" };
					}
				}
			});
	},
};

export default authService;
