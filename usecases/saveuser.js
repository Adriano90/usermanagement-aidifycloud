(function() {

'use strict';

class SaveUser {
	
	constructor(userRepository){
		this.userRepository = userRepository;
	}
	
	execute(user, res) {
		this.userRepository
			.save(user)
			.then(function(user) {
				res && res.ok(user);
			})
			.catch(function(err) {
				console.log("SaveUserUseCase error: " + err);
				res && res.ko(JSON.stringify('Error saving user'));
			});
	}
}

module.exports = SaveUser;

})();