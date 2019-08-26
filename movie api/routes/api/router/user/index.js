(function () {
	const express = require('express');
	const router = express.Router();
	const auth = require('../../../../middleware/auth');

	const CREATE_USER = require('../../../../controllers/user/createUser');
	const LOGIN_USER = require('../../../../controllers/user/loginUser');

	router.route(`/users`).post(CREATE_USER);
	router.route('/login').post(LOGIN_USER);

	module.exports = router;
})();
// http://localhost:4000/
