(function() {

'use strict';

const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Create logger
let logger = new Logger();

// Webservice bootstrap
const Server = require('./webservice/server');
const GetUserUseCase = require('./usecases/getuser');
const UserMapper = require('./model/usermapper');
const UserRepository = require('./model/userrepository');

let userRepository = new UserRepository(logger, UserMapper);
let getUserUseCase = new GetUserUseCase(userRepository);

new Server(logger, getUserUseCase);

// Broker bootstrap
const Broker = require('./messagebroker/broker');
const SaveUserUseCase = require('./usecases/saveuser');

let saveUserUseCase = new SaveUserUseCase(userRepository);

new Broker(logger, saveUserUseCase);

})();