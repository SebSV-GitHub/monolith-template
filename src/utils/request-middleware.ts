import type {
	RequestHandler,
	Request,
	Response,
} from "express-serve-static-core";

function requestMiddleware(
	fn: (request: Request, response: Response) => Promise<void>
): RequestHandler {
	return (request, response, next) => {
		fn(request, response)
			.then(() => {
				next();
			})
			.catch(next);
	};
}

export default requestMiddleware;
