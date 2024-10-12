const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    director_name: {
      type: String,
      required: true,
    },
    studio_name: {
      type: String,
      required: true,
    },
    collection_amt: {
      type: Number,
      required: true,
    },
    updated_at: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false, // Exclude __v field if you don't want it
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

movieSchema.virtual("collection_in_words").get(function () {
  const amount = this.collection_amt;
  if (amount >= 1e9) {
    return (amount / 1e9).toFixed(1) + " billion";
  } else if (amount >= 1e6) {
    return (amount / 1e6).toFixed(1) + " million";
  }
  return amount.toString();
});

movieSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
