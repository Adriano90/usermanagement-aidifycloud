(function() {

'use strict';

class User {

	constructor(id, login, location, avatar) {
		this.id = id;
		this.login = login;
		this.location = location;
		this.avatar = avatar;
	}

}

module.exports = User;

})();