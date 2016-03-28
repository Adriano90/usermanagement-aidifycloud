(function() {

'use strict';

class GetUser {
	
	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	
	execute(params, res) {
		let id = params.id;
		this.userRepository
			.getById(id)
			.then(function(user){
				res.ok(user);
			})
			.catch(function(err){
				console.log("GetUserUseCase error: " + err);
				res.ko(err);
			});
	}
}

module.exports = GetUser;

})();