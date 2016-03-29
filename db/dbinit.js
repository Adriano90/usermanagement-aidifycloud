(function() {

'use strict';

let mongoose = require('mongoose');

class DbConnect {

	constructor(logger) {
	
		mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME);
		let db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
		  logger.info('DB connected successfully');
		});
	}

}

module.exports = DbConnect;

})();