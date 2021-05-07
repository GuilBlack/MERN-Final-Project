//used to choose which theme to assign to a component
const themeHelper = {
	bodyTheme: (theme) => {
		if (theme === "dark") {
			return (
				"html, body { background-color: rgb(180,153,243);" +
				"background: linear-gradient(180deg, rgba(180,153,243,1) 0%, rgba(53,35,109,1) 100%) fixed;" +
				"height: 100%; }"
			);
		} else {
			return "html, body {background-color: white;}";
		}
	},
	textTheme: (theme) => {
		if (theme === "dark") {
			return "text-light";
		} else {
			return "app-text-dark";
		}
	},
	navbarTheme: (theme) => {
		if (theme === "dark") {
			return "navbar-dark bg-dark";
		} else {
			return "navbar-light bg-light app-navbar-shadow";
		}
	},
	jumbotronTheme: (theme) => {
		if (theme === "dark") {
			return "app-jumbotron-dark text-light";
		} else {
			return "app-jumbotron-light text-dark";
		}
	},
	linkTheme: (theme) => {
		if (theme === "dark") {
			return "app-link-dark";
		} else {
			return "app-link-light";
		}
	},
	chooseImage: (theme, ImageLight, ImageDark) => {
		if (theme === "dark") {
			return ImageLight;
		} else {
			return ImageDark;
		}
	},
	cardTheme: (theme) => {
		if (theme === "dark") {
			return "text-light app-card-dark";
		} else {
			return "text-light app-card-light";
		}
	},
};

export default themeHelper;
