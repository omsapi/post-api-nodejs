var mongoose = require('mongoose');
var moment=require('moment');

var schema = mongoose.Schema({
    userId: String,
    title: String,
    content: String,
    created: {type: Date, default: moment.utc}
});

module.exports = mongoose.model('post', schema);