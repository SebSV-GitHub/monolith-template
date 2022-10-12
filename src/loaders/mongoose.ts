import mongoose from "mongoose";
import config from "config";
import { createLogger } from "@sebsv-github/logger";

async function load() {
	const logger = createLogger({ label: "Mongoose loader" });

	logger.debug("Loading mongoose");

	const uri = `mongodb://${_generateCredentials()}${config.get<string>(
		"db.host"
	)}:${config.get<string | number>("db.port")}/${config.get<string>(
		"db.database"
	)}`;
	try {
		await mongoose.connect(uri);
		logger.info("Database connected");
	} catch (error: unknown) {
		throw error;
	}
}

function _generateCredentials(): string {
	if (config.has("db.username") && config.has("db.password")) {
		const username = config.get("db.username");
		const password = config.get("db.password");
		if (username === "" || password === "") {
			return "";
		}

		return `${config.get<string>("db.username")}:${config.get<string>(
			"db.password"
		)}@`;
	}

	return "";
}

export default load;
