import jwt from "jsonwebtoken";

function sign(payload) {
  return jwt.sign(payload, getSecret());
}

function verify(token) {
  return jwt.verify(token, getSecret());
}

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error("JWT Secret not defined into environment variables");
  }
  return secret;
}

export { sign, verify };
