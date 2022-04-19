const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie.model')

/* GET movies page */
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(moviesFromDB => {
        console.log(moviesFromDB);
        res.render("movies", {movies: moviesFromDB})
    })
    .catch(err => {
        next(err)
    })
  });
  
  
  /* POST new movies page */
  router.post('/movies', (req, res, next) => {
      // create the movie in the db
      const { title, genre, plot, cast } = req.body
      console.log(title, genre, plot, cast);
      Movie.create({
          title: title,
          genre: genre,
          plot: plot,
          cast: cast
        })
    .then(createdMovie => {
        console.log(createdMovie);
        res.redirect('/movies')
    })
    .catch(err => {
        next(err)
    })
})

/* GET new movies page */
router.get('/movies/new', (req, res, next) => {
    // get all the celebrities from the db
    Celebrity.find()
    .then(celebritiesFromDB => {
      console.log(celebritiesFromDB)
      res.render('newMovie', { celebrities: celebritiesFromDB })
    })
})

// Der link zur Edit Seite
router.get('/movies/:id/edit', (req, res, next) => {
	const id = req.params.id
	Movie.findById(id)
		.then(movieFromDB => {
      Celebrity.find()
      .then(celebritiesFromDB =>{
        console.log(celebritiesFromDB);
        console.log('-------------------');
        console.log(movieFromDB);
        res.render('editMovie', { movie: movieFromDB, celebrities: celebritiesFromDB })
      })
		})
		.catch(err => {
			next(err)
		})
});

// Was beim Abschicken der Änderungen beim Movie geschieht
router.post('/movies/:id/edit', (req, res, next) => {
  // res.send('hello')
  const { title, genre, plot, cast } = req.body
  const id = req.params.id
  Movie.findByIdAndUpdate(id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  }, {new: true})
    .then(updatedMovie => {
      console.log(updatedMovie);
      res.redirect(`/movies/${updatedMovie._id}`)
    })
    .catch(err => {
      next(err)
  })
})


router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    
    Movie.findById(id)
    .populate('cast')
    .then(movieFromDB => {
      console.log(movieFromDB);
      res.render('movie', { movie: movieFromDB })
    })
    .catch(err => {
      next(err)
    })
  })

module.exports = router;

