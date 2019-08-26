const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

function auth (req, res, next) {

	const token = req.header('x-auth-token');

	if (!token)
	{
		return res.status(401).send('No token provided in headers.');
	}

	try
	{
		const decodedToken = jwt.verify(token, jwtPrivateKey);
		req.user = decodedToken;
		next();
	} catch (error)
	{
		res.status(400).send('Invalid provided token.');
	}
}

module.exports = auth;
