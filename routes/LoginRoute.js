var express = require('express');
var loginRouter = express.Router();
var LoginController = require('../controllers/LoginController');

loginRouter.post('/', LoginController.login);
loginRouter.post('/logout', LoginController.logout);

module.exports = loginRouter;