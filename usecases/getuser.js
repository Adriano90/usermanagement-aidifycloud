(function() {

'use strict';

class GetUser {
	
	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	
	execute(params, res) {
		let login = params.login;
		this.userRepository
			.getByLogin(login)
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