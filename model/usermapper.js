(function() {

'use strict';

const User = require('./user');

module.exports.fromDB = function(dbUser) {
	return new User(dbUser['id'], dbUser['login'], dbUser['name'], dbUser['location'], dbUser['avatar']);
}

})();