const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
		// this is the name of the model that this id refers to
		ref: 'Celebrity'
    }],
});
    
const Movie = model("Movie", movieSchema);

module.exports = Movie;