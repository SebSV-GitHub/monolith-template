function getToken(req) {
  const authHeader = req.get("Authorization");
  const [prefix, token] = authHeader.split(" ");
  return { prefix, token };
}

export { getToken };
