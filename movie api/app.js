(function () {
	require('dotenv').config();
	const express = require('express');
	const app = express();
	const morgan = require('morgan');
	const PORT = process.env.PORT || 5000;
	const cors = require('cors');
	const mongoose = require('mongoose');
	const userRouter = require('./routes/api/router/user');
	const movieRouter = require('./routes/api/router/movie');
	const { ENVIRONMENT } = process.env;

	const { DATABASE_NAME } = process.env;
	mongoose.Promise = Promise;
	mongoose.set('useFindAndModify', false);
	mongoose
		.set('useCreateIndex', true)
		.connect(DATABASE_NAME, { useNewUrlParser: true, keepAlive: true })
		.then(() => {
			if (process.env.ENVIRONMENT === 'DEV')
			{
				return console.log('db connected');
			}
			return console.log('mongodb connected');
		})
		.catch(err => {
			console.warn('==> ', err);
			throw new Error(err);
		});

	app.use(express.json());
	app.use(
		cors({
			exposedHeaders: ['x-auth-token'],
			origin: 'http://localhost:8080'
		})
	);
	if (process.env.ENVIRONMENT === 'DEV')
	{
		app.use(morgan('combined'));
	}
	app.use(express.urlencoded({ extended: true, limit: '100kb', parameterLimit: 800, json: true }));

	app.use(userRouter);
	app.use(movieRouter);

	app.listen(process.env.PORT || PORT, () => {
		console.log(`App on port ${ PORT }`);
	});
})();
// http://localhost:4000

