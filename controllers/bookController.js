var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');

exports.index = (req, res) => {
    async.parallel({
        book_count: (callback) => {
            Book.countDocuments({}, callback); // pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: (callback) => {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: (callback) => {
            BookInstance.countDocuments({
                status: 'Available'
            }, callback);
        },
        author_count: (callback) => {
            Author.countDocuments({}, callback);
        },
        genre_count: (callback) => {
            Genre.countDocuments({}, callback);
        }
    }, (err, results) => {
        res.render('index', {
            title: 'Local Library Home',
            error: err,
            data: results
        });
    });
};

// display list of all books
exports.book_list = (req, res, next) => {

    Book.find({}, 'title author')
        .populate('author')
        .exec((err, list_books) => {
            if (err) {
                return next(err);
            }

            // successful, so render
            res.render('book_list', {
                title: 'Book List',
                book_list: list_books
            });
        });
};

// display detail page for a specific book
exports.book_detail = (req, res, next) => {

    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function (callback) {
            BookInstance.find({
                    'book': req.params.id
                })
                .exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err)
        }
        // no results
        if (results.book == null) {
            var err = new Error(results.id);
            err.status = 404;
            return next(err);
        }

        // successful, so render
        res.render('book_detail', {
            title: 'Title',
            book: results.book,
            book_instances: results.book_instance
        });
    });
};

// display book create form on GET
exports.book_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// handle book create on POST
exports.book_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// display book delete form on GET
exports.book_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// handle book delete on POST
exports.book_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// display book update form on GET
exports.book_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// handle book update on POST
exports.book_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update POST');
};