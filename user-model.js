var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: String,
    username: String,
    password: String,
    isActive: Boolean,
    createdDate: Date,
    lastModifiedDate: Date
});

module.exports = mongoose.model('User', userSchema);
