(function() {

'use strict';

class User {

	constructor(id, login, name, location, avatar) {
		this.id = id;
		this.login = login;
		this.name = name;
		this.location = location;
		this.avatar = avatar;
	}

}

module.exports = User;

})();