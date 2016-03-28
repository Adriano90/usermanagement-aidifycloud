(function() {

'use strict';

class UserRepository {
	
	constructor(logger, mapper) {
		this.logger = logger;
		this.mapper = mapper;
	}

	getById(id) {
		console.log('Requested user with id: %d', id);
		let self = this;
		return new Promise(function (resolve,reject) {
			let res = {id: 1, login: "user1"}
			resolve(self.mapper.fromDB(res));
		});
	}
	
	save(user) {
		console.log('Saving user: %j', user);
		return;
	}
}

module.exports = UserRepository;

})();