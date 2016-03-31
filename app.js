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
const GetAllUsersUseCase = require('./usecases/getusers');
const UserMapper = require('./model/usermapper');
const UserRepository = require('./model/userrepository');
const UserModel = require('./db/usermodel');

let userRepository = new UserRepository(logger, UserMapper, UserModel);
let getUserUseCase = new GetUserUseCase(userRepository);
let getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

new Server(logger, getUserUseCase, getAllUsersUseCase);

// Broker bootstrap
const Broker = require('./messagebroker/broker');
const SaveUserUseCase = require('./usecases/saveuser');

let saveUserUseCase = new SaveUserUseCase(userRepository);

new Broker(logger, saveUserUseCase);

})();