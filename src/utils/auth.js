import AppError from "./AppError";

function getToken(req) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new AppError(401, "No authorization header");
  }
  const [prefix, token] = authHeader.split(" ");
  return { prefix, token };
}

export { getToken };
