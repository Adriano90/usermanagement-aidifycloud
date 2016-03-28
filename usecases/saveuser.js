(function() {

'use strict';

class SaveUser {
	
	constructor(userRepository){
		this.userRepository = userRepository;
	}
	
	execute(user) {
		this.userRepository
			.save(user);
	}
}

module.exports = SaveUser;

})();