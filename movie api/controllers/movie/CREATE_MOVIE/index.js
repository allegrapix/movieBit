(function () {
  const Movie = require("../../../models/movie");
  const mongoose = require('mongoose');
  async function createMovieController (req, res, next) {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId))
    {
      return res.status(500).send('Invalid id for user.')
    }

    const { body } = req;
    const validationResult = body;
    if (validationResult.error)
    {
      res.status(403).json({
        isJoi: true,
        createMovieErrMsg: error["details"][0]["message"]
      });
      next(error);
    } else
    {
      try
      {
        const movie = new Movie(body);
        movie.madeAt = Date.now();

        if (!mongoose.Types.ObjectId.isValid(movie._id))
        {
          return res.status(500).send('Invalid id for Movie.')
        }

        const savedMovie = await movie.save();
        res.status(200).send({ savedMovie });
        next();
      } catch (error)
      {
        res.status(404).send({
          isJoi: false,
          createMovieErrorMessage: error
        });
        next(error);
      }
    }
  }

  module.exports = createMovieController;
})();
