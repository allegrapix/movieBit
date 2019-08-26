const Movie = require('../../../models/movie');

async function updateMovieController (req, res, next) {
	// const { userId, movieId } = req.params;
	// const userId = req.user._id;
	const movieId = req.params.movieid;

	const { body } = req;
	console.log(body);
	

	Movie.findOneAndUpdate(
		{ _id: movieId,
			//  user: userId 
			}, //userId === userId
		{ ...body },
		{ new: true },
		function (err, savedMovie) {
			if (err)
			{
				// userId not found =>
				res
					.status(404)
					.send({ isJoi: false, savedMovErrMsg: 'Movie with the given id was not found.', err }); //cast to object userId
				next(err);
			} else
			{
				res.status(200).json({ savedMovie });
				next();
			}
		}
	);
}

module.exports = updateMovieController;
