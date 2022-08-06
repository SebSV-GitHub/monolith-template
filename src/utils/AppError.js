class AppError extends Error {
  constructor(status, message, description = message) {
    super(message);
    this.status = status;
    this.description = description;
  }
}

export default AppError;
