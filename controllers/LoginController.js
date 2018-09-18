var loginModel = require("../models/LoginModel");

module.exports = {
    login: function (req, res, next) {
        loginModel.login(req, res, next);

    },
    code: function (req,res,next) {
        loginModel.code(req, res, next);        
    },
    logout: function (req, res, next) {
        loginModel.logout(req, res, next);

    }

};