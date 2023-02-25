import z from "zod";

const schema = z.object({
	host: z.string(),
	username: z.string(),
	password: z.string(),
	database: z.string(),
});

export default schema;
