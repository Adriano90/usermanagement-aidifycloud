(function() {

'use strict';

class UserRepository {
	
	constructor(logger, mapper, UserModel) {
		this.logger = logger;
		this.mapper = mapper;
		this.UserModel = UserModel;
	}

	getById(id) {
		let self = this;
		self.logger.info('Requested user with id: ' + id);
		return new Promise(function (resolve,reject) {
			self.UserModel.find({id: id}, function(err, user) {
				if (err) {
					self.logger.error(err)
					reject(err);
					return;
				}
				
				resolve(user.length > 0 ? self.mapper.fromDB(user[0]) : null);
			});
		});
	}
	
	getAll() {
		let self = this;
		self.logger.info('Retrieving all users');
		return new Promise(function (resolve,reject) {
			self.UserModel.find({}, function(err, users) {
				if (err) {
					self.logger.error(err)
					reject(err);
					return;
				}
				
				resolve(users.map((elem) => self.mapper.fromDB(elem)));
			});
		});
	}
	
	save(user) {
		let self = this;
		self.UserModel.update(
			{id: user.id}, 
			{$setOnInsert: user}, 
			{upsert: true}, 
			function(err, numAffected) {
				if (err) {
					return self.logger.error(err);
				}
			});
	}
}

module.exports = UserRepository;

})();