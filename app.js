(function() {

'use strict';

const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Create logger
let logger = new Logger();

// Init DB
const DbInit = require('./db/dbinit');

new DbInit(logger);

// Webservice bootstrap
const Server = require('./webservice/server');
const GetUserUseCase = require('./usecases/getuser');
const GetUsersUseCase = require('./usecases/getusers');
const SaveUserUseCase = require('./usecases/saveuser');
const UserMapper = require('./model/usermapper');
const UserRepository = require('./model/userrepository');
const UserModel = require('./db/usermodel');

let userRepository = new UserRepository(logger, UserMapper, UserModel);
let getUserUseCase = new GetUserUseCase(userRepository);
let getUsersUseCase = new GetUsersUseCase(userRepository);
let saveUserUseCase = new SaveUserUseCase(userRepository);

new Server(logger, getUserUseCase, getUsersUseCase, saveUserUseCase);

// Broker bootstrap
const Broker = require('./messagebroker/broker');

new Broker(logger, saveUserUseCase);

})();