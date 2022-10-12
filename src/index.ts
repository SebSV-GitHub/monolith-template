import process from "node:process";
import http from "node:http";
import { globalLogger } from "@sebsv-github/logger";
import createApp from "./app";

(async () => {
	try {
		const app = await createApp();
		const server = http.createServer(app);
		server.listen(process.env.PORT);
		globalLogger.info(`Server running on port ${process.env.PORT!}`);
	} catch (error: unknown) {
		globalLogger.error("Error initializing the server", error);
	}
})();
