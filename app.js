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
const GetAllUserUseCase = require('./usecases/getusers');
const UserMapper = require('./model/usermapper');
const UserRepository = require('./model/userrepository');
const DbInit = require('./db/dbinit');
const UserModel = require('./db/usermodel');

new DbInit(logger);

let userRepository = new UserRepository(logger, UserMapper, UserModel);
let getUserUseCase = new GetUserUseCase(userRepository);
let getAllUserUseCase = new GetAllUserUseCase(userRepository);

new Server(logger, getUserUseCase, getAllUserUseCase);

// Broker bootstrap
const Broker = require('./messagebroker/broker');
const SaveUserUseCase = require('./usecases/saveuser');

let saveUserUseCase = new SaveUserUseCase(userRepository);

new Broker(logger, saveUserUseCase);

})();