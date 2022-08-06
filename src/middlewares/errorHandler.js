import AppError from "../utils/AppError";

const errorHandler = (err, _req, res, next) => {
  if (!(err instanceof AppError)) {
    res.status(500).json({ message: "Unknown error ocurred" });
    return next();
  }
  res.status(err.status).json({ message: err.description });
  next();
};

export default errorHandler;
