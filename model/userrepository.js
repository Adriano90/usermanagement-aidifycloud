(function() {

'use strict';

class UserRepository {
	
	constructor(logger, mapper, UserModel) {
		this.logger = logger;
		this.mapper = mapper;
		this.UserModel = UserModel;
	}

	getByLogin(login) {
		let self = this;
		self.logger.info('Requested user with login: ' + login);
		return new Promise(function (resolve,reject) {
			self.UserModel.find({login: login}, function(err, user) {
				if (err) {
					self.logger.error(err)
					reject(err);
					return;
				}
				
				resolve(user.length > 0 ? self.mapper.fromDB(user[0]) : null);
			});
		});
	}
	
	getUsers(params) {
		let self = this;
		self.logger.info('Retrieving all users');
		return new Promise(function (resolve,reject) {
			self.UserModel.find(params, function(err, users) {
				if (err) {
					self.logger.error(err)
					return reject(err);
				}
				
				resolve(users.map((elem) => self.mapper.fromDB(elem)));
			});
		});
	}
	
	save(user) {
		let self = this;
		self.logger.info("User to save: " + JSON.stringify(user));
		return new Promise(function (resolve,reject) {
			self.UserModel.update(
				{login: user.login},
				user,
				{upsert: true},
				function(err, numAffected) {
					if (err) {
						self.logger.error(err);
						return reject(err);
					}
					resolve(user);
				}
			);
		});
	}
}

module.exports = UserRepository;

})();