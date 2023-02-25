import mongoose from "mongoose";
import config from "config";
import { createLogger } from "@sebsv-github/logger";
import validator from "../../utils/validator";
import validations from "./validations";

async function load() {
	const logger = createLogger({ label: "Mongoose loader" });

	logger.debug("Loading mongoose");

	const parsedDbCredentials = validator(validations, {
		host: config.get("db.host"),
		username: config.get("db.username"),
		password: config.get("db.password"),
		database: config.get("db.database"),
	});

	const uri = parsedDbCredentials.host;

	try {
		const { username, password, database } = parsedDbCredentials;
		mongoose.set("strictQuery", false);
		await mongoose.connect(uri, {
			user: username,
			pass: password,
			dbName: database,
		});
		logger.info("Database connected");
	} catch (error: unknown) {
		throw error;
	}
}

export default load;
