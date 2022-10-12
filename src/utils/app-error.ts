class AppError extends Error {
	status: number;
	description: string;

	constructor(status: number, message: string, description = message) {
		super(message);
		this.status = status;
		this.description = description;
	}
}

export default AppError;
