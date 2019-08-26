const Movie = require('../../../models/movie');

async function deleteMovieController (req, res, next) {
	const movieId = req.params.movieid;
	console.log(movieId);

	Movie.findOneAndDelete({ _id: movieId }, function (err, deletedMovie) {
		if (err)
		{
			res.status(404).send({
				deletedMovieErrorMessage: 'Movie with the given id was not found.',
				isJoi: false
			});
			next(err);
		} else
		{
			res.status(200).send({ deletedMovie });
			next();
		}
	});
}

module.exports = deleteMovieController;
