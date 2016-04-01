(function() {

'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    id: Number,
	login: String,
	location: String
});

userSchema.index({ id: 1 }, { unique: true })

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;

})();