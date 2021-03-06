(function() {

'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    id: Number,
	login: String,
	name: String,
	location: String,
	avatar: String
});

userSchema.index({ id: 1 }, { unique: true })

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;

})();