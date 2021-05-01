const axios = require("axios").default;

const authService = {
	login: (user) => {
		return axios.post("/user/login", user).then((res) => res.data);
	},

	register: (user) => {
		return axios.post("/user/register", user).then((res) => res.data);
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
