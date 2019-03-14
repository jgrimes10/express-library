var BookInstance = require('../models/bookinstance')

// display list of all BookInstances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) {
        return next(err)
      }

      // successful, so render
      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances
      })
    })
}

// display detail page for a specific BookInstance
exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) {
        return next(err)
      }
      // no results
      if (bookinstance == null) {
        err = new Error('Book copy not found')
        err.status = 404
        console.log(req.params.id)
        return next(err)
      }

      // successful, so render
      res.render('bookinstance_detail', {
        title: 'Book:',
        bookinstance: bookinstance
      })
    })
}

// display BookInstance create form on GET
exports.bookinstance_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
}

// handle BookInstance create on POST
exports.bookinstance_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
}

// display BookInstance delete form on GET
exports.bookinstance_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
}

// handle BookInstance delete on POST
exports.bookinstance_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
}

// display BookInstance update form on GET
exports.bookinstance_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
}

// handle bookinstance update on POST
exports.bookinstance_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
}