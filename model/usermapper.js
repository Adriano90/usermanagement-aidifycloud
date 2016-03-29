(function() {

'use strict';

const User = require('./user');

module.exports.fromDB = function(dbUser) {
	console.log('Mapping user');
	return new User(dbUser.id, dbUser.login);
}

})();