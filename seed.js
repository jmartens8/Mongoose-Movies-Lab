const Celebrity = require('./models/Celebrity.model')

const mongoose = require('mongoose')
const Movie = require('./models/Movie.model')
mongoose.connect('mongodb://localhost/boilerplate')

const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "Actor",
        catchPhrase: "Is the colonel's underwear a matter of national security?"
    },
    {
        name: "Sir Winston Leonard Spencer-Churchill",
        occupation: "Politician",
        catchPhrase: "The maxim of the British people is Business as usual."
    },
    {
        name: "Jesus",
        occupation: "God",
        catchPhrase: "Dude ..."
    }
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success - added ${celebrities.length} to the db`)
		mongoose.connection.close()
	})
	.catch(err => {
		console.log(err)
	})

