(function () {
  const mongoose = require("mongoose");
  const { Schema, model } = mongoose;

  const movieSchema = new Schema({
    Title: {
      type: String,
      required: [true, "Title is required."],
      minlength: 2,
      maxlength: 600
    },
    Year: {
      type: String,
      minlength: 4,
      maxlength: 4,
      required: [true, 'Year is required.']
    },
    Runtime: {
      type: String,
      maxlength: 8
    },
    Genre: {
      type: String,
      maxlength: 860,
      required: [true, 'Genre is required']
    },
    Language: {
      type: String,
      minlength: 3,
      maxlength: 18,
      required: true
    },
    Country: {
      type: String,
      maxlength: 18,
      required: [true, "Country is required."]
    },
    Poster: {
      type: String,
      required: [true, "Poster is required."]
    },
    imdbRating: {
      type: String,
      required: [true, 'Rating is required.']
    },
    imdbVotes: {
      type: String,
      required: [true, 'IMBD votes are required.']
    },
    imdbID: {
      type: String,
      required: [true, 'imdbID is required.']
    },
    Type: {
      type: String,
      required: true
    }, 
    madeAt: {
      type: Number, 
      default: Date.now()
    }
  });

  const Movie = model("Movie", movieSchema);
  module.exports = Movie;
})();
