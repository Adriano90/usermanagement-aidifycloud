(function() {

'use strict';

class GetUsers {

	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	
	execute(params, res) {
		this.userRepository
			.getUsers(params)
			.then(function(users){
				res.ok(users);
			})
			.catch(function(err){
				console.log("GetUserUseCase error: " + err);
				res.ko(err);
			});
	}

}

module.exports = GetUsers;

})();