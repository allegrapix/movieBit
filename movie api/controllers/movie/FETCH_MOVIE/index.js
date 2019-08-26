// http://localhost:4000/brands?brands[]=bmw&brands[]=orca
// http://localhost:4000/movies/?excludedMakes[]=bmw
(function () {
  const Movie = require('../../../models/movie');
  async function fetchMovieController (req, res, next) {


    async function retrieveMovies () {
      const movie = await Movie.findById(req.params.movieid)
      console.log('------------', movie);
      
      return movie;
    }

    try
    {
      const movies = await retrieveMovies();
      res.status(200).json({ movies });
      next();
    } catch (error)
    {
      res.status(500).send(new Error('Could not find movies.'));
      next(error);
    }
  }
  module.exports = fetchMovieController;
})();

