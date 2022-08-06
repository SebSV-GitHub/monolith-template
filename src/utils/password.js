import argon2 from "argon2";

function hash(password) {
  return argon2.hash(password);
}

function verify(hashedPassword, password) {
  return argon2.verify(hashedPassword, password);
}

export { hash, verify };
