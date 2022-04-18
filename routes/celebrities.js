const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

/* GET celebrities page */
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
      console.log(celebritiesFromDB);
      res.render("celebrities", {celebrities: celebritiesFromDB})
  })
  .catch(err => {
      next(err)
  })
});

// wenn ich auf den New Celebrity Link klicke gehe ich dorthin
router.get('/celebrities/new', (req, res, next) => {
  res.render('new')
})

// Der link zur Edit Seite
router.get('/celebrities/:id/edit', (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebrityFromDB => {
			res.render('edit', { celebrity: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});

// Was beim Abschicken der Änderungen beim Celebrtiy geschieht
router.post('/celebrities/:id/edit', (req, res, next) => {
  // res.send('hello')
  const { name, occupation, catchPhrase } = req.body
  const id = req.params.id
  Celebrity.findByIdAndUpdate(id, {
    name,
    occupation,
    catchPhrase
  }, {new: true})
    .then(updatedCelebrity => {
      res.redirect(`/celebrities/${updatedCelebrity._id}`)
    })
    .catch(err => {
      next(err)
  })
})


// Create a new celebrity
router.post('/celebrities', (req, res, next) => {
  // create the celebrity in the db
	const { name, occupation, catchPhrase } = req.body
	console.log(name, occupation, catchPhrase)
	Celebrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase,
	})
    .then(createdCelebrity => {
        console.log(createdCelebrity)
        res.redirect(`/celebrities/${createdCelebrity._id}`)
    })
    .catch(err => {
        next(err)
      })
});

// Find Celebrity by ID
router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id
  
  Celebrity.findById(id)
  .then(celebrityFromDB => {
    console.log(celebrityFromDB);
    res.render("celebrity", { celebrity: celebrityFromDB })
  })
  .catch(err => {
    next(err)
  })
})

// Delete a celebrity
router.get('/celebrities/:id/delete', (req, res, next) => {
  const id = req.params.id
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      // redirect to the celebrities list
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router;

