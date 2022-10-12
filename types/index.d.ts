export {};

declare global {
	declare module "express-serve-static-core" {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface Request {
			user: unknown;
		}
	}
}
