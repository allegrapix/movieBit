(function () {
	const express = require('express');
	const router = express.Router();
	const auth = require('../../../../middleware/auth');

	const CREATE_MOVIE = require('../../../../controllers/movie/CREATE_MOVIE');
	const DELETE_MOVIE = require('../../../../controllers/movie/DELETE_MOVIE');
	const FETCH_MOVIES = require('../../../../controllers/movie/FETCH_MOVIES');
	const FETCH_MOVIE = require('../../../../controllers/movie/FETCH_MOVIE');
	const UPDATE_MOVIE = require('../../../../controllers/movie/UPDATE_MOVIE');

	router.post('/movies', auth, CREATE_MOVIE);
	router.get('/movies', FETCH_MOVIES);
	router.get('/movies/:movieid', FETCH_MOVIE);
	router.delete('/movies/:movieid', auth, DELETE_MOVIE);
	router.patch('/movies/:movieid', auth, UPDATE_MOVIE);

	module.exports = router;
})();
