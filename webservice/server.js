(function(){

'use strict';

const restify = require('restify');
const config = require('../package.json');
const Response = require('./response');

class Server {
	
	constructor(logger, getUser, getUsers) {
		let api = restify.createServer({
			name: config.name,
			version: config.version
		});
		api.use(restify.acceptParser(api.acceptable));
		api.use(restify.queryParser());
		api.use(restify.bodyParser());
		
		api.get('/', function(req, res) {
			let response = new Response(res, logger));
			response.pong();
		});
		
		api.get('/user/:id', function(req, res) {
			if (logger) {
				logger.info('request GET : /user/' + JSON.stringify(req.params.id));
			}
			
			getUser.execute(req.params, new Response(res, logger));
		});
		
		api.get('/user', function(req, res) {
			if (logger) {
				logger.info('request GET : /user');
			}
			
			getUsers.execute(null, new Response(res, logger));
		});
		
		api.listen(process.env.PORT || 5001,function () {
			logger.config(config.name + ' up and ready');
		});
	}
}

module.exports = Server;

})();