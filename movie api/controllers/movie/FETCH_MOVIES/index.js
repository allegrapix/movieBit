// http://localhost:4000/brands?brands[]=bmw&brands[]=orca
// http://localhost:4000/movies/?excludedMakes[]=bmw
(function () {
	const Movie = require('../../../models/movie');
	async function fetchMoviesController(req, res, next) {
		const Title = req.query.Title ? req.query.Title : null,
			Year = req.query.Year,
			Genre = req.query.Genre,
			Language = req.query.Language,
			Country = req.query.Country,
			currentPage = req.query.currentPage,
			take = req.query.take;

		
		let queryO = {};
		if (Title) {
			queryO.Title = Title
		};
		if (Year) {
			queryO.Year = Year;
		};
		if (Genre) {
			queryO.Genre = Genre;
		};
		if (Language) {
			queryO.Language = Language;
		};
		if (Country) {
			queryO.Country = Country;
		}

		const queryData = {
			"Title": { "$regex": queryO.Title || "", '$options': 'i' },
			"Year": { "$regex": queryO.Year || "" },
			"Language": { "$regex": queryO.Language || "" },
			"Country": { "$regex": queryO.Country || "", '$options' : 'i' },
			"Genre": { "$regex": queryO.Genre || "", '$options': 'i' }
		};

		async function retrieveMovies() {
			const movies = await Movie.find(
				queryData,
			)
				.skip((currentPage - 1) * take)
			.limit(parseInt(take))
			.sort({madeAt: -1})
			
			return movies
		}

		try {
			const movies = await retrieveMovies();
			const nrOfMovies = await Movie.find(queryData).count();
			const nrOfPages = Math.ceil(nrOfMovies / 10);

			res.status(200).json({movies, nrOfPages});
			next();
		} catch (error) {
			res.status(500).send(new Error('Could not find movies.'));
			next(error);
		}
	}
	module.exports = fetchMoviesController;
})();
// 28 - 12
	// TODO: allow bookings on front

// comparison operators:
// eq(equal)
// ne (not equal)
// gt (grater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in (included in array of values (any))
// nin (not in)

// logical operators:
// or  /  and
// or: .find().or([ {}, {} ])
// and: .find().and([{}, {}]) => filter objects

// find().count() //return matching document count which are matching criteria

// find().skip()
