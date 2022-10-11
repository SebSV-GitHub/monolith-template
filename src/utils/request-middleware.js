function requestMiddleware(fn) {
	return async (request, response, next) => {
		try {
			await fn(request, response, next);
			next();
		} catch (error) {
			next(error);
		}
	};
}

export default requestMiddleware;
