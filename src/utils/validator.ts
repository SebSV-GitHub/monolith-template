import type { ZodSchema } from "zod";
import { createLogger } from "@sebsv-github/logger";

function validate<T>(schema: ZodSchema<T>, data: unknown) {
	const logger = createLogger({ label: "Validator" });
	const result = schema.safeParse(data);
	if (result.success) {
		return result.data;
	}

	logger.error(result.error);
	throw result.error;
}

export default validate;
