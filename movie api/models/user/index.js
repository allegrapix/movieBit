(function () {
	const mongoose = require('mongoose');
	const { Schema, model } = mongoose;
	const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
	const jwt = require('jsonwebtoken');

	const userSchema = new Schema({
		username: {
			type: String,
			unique: true,
			minlength: 3,
			maxlength: 66,
			required: [true, 'Username is required.']
		},
		email: {
			type: String,
			unique: true,
			minlength: 5,
			maxlength: 60,
			required: [true, 'User email address is required.']
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 1000
		}
	});

	userSchema.methods.generateAuthToken = function () {
		const token = jwt.sign({ _id: this._id, username: this.username, email: this.email }, jwtPrivateKey);
		return token;
	};

	const User = model('User', userSchema);
	module.exports = User;
})();
