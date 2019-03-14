var Genre = require('../models/genre')
var Book = require('../models/book')

var async = require('async')

const {
  body,
  validationResult
} = require('express-validator/check')
const {
  sanitizeBody
} = require('express-validator/filter')

// display list of all Genre
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([
      ['name', 'ascending']
    ])
    .exec((err, list_genres) => {
      if (err) {
        return next(err)
      }

      // successful, so render
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genres
      })
      console.log()
    })
}

// display detail page for a specific Genre
exports.genre_detail = (req, res, next) => {
  async.parallel({
      genre: callback => {
        Genre.findById(req.params.id).exec(callback)
      },

      genre_books: callback => {
        Book.find({
          genre: req.params.id
        }).exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err)
      }

      // no results
      if (results.genre == null) {
        err = new Error('Genre not found')
        err.status = 404
        return next(err)
      }

      // successful, so render
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre: results.genre,
        genre_books: results.genre_books
      })
    }
  )
}

// display Genre create form on GET
exports.genre_create_get = (req, res) => {
  res.render('genre_form', {
    title: 'Create Genre'
  })
}

// handle Genre create on POST
exports.genre_create_post = [
  // validate that the name field is not empty
  body('name', 'Genre name required')
  .isLength({
    min: 1
  })
  .trim(),

  // sanitize (trim and escape) the name field
  sanitizeBody('name')
  .trim()
  .escape(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract the validation errors from a request
    const errors = validationResult(req)

    // create a genre object with escaped and trimmed data
    var genre = new Genre({
      name: req.body.name
    })

    if (!errors.isEmpty()) {
      // there are errors, render the form again with sanitized values/error message
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array()
      })
    } else {
      // data from form is valid
      // check if Genre with same name already exists
      Genre.findOne({
        'name': req.body.name
      }).exec(function (err, found_genre) {
        if (err) {
          return next(err)
        }

        if (found_genre) {
          // genre exists, redirect to its detail page
          res.redirect(found_genre.url)
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err)
            }
            // genre seaved, redirect to genre detail page
            res.redirect(genre.url)
          })
        }
      })
    }
  }
]

// display Genre delete form on GET
exports.genre_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete GET')
}

// handle Genre delete on POST
exports.genre_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete POST')
}

// display Genre update form on GET
exports.genre_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update GET')
}

// handle Genre update on POST
exports.genre_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update POST')
}