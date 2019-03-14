var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, max: 100 },
        family_name: { type: String, required: true, max: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date }
    }
);

// virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function() {
        return `${this.family_name}, ${this.first_name}`;
});

// virtual for author's life span
AuthorSchema
    .virtual('lifespan')
    .get(function () {
        return (moment(this.date_of_birth).format('MMMM Do, YYYY') + ' - ' + moment(this.date_of_death).format('MMMM Do, YYYY'));
});

// virtual for author's url
AuthorSchema
    .virtual('url')
    .get(function() {
        return '/catalog/author/' + this._id;
});

// export model
module.exports = mongoose.model('Author', AuthorSchema);
