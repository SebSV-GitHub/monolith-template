function userDAOToProfileDTO(userDAO) {
	const { username, email } = userDAO;
	return { username, email };
}

export { userDAOToProfileDTO };
