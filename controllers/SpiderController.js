var spiderModel = require("../models/SpiderModel");

module.exports = {
    SpiderList: function (req, res, next) {
        spiderModel.SpiderList(req, res, next);

    },
    UpdateSpider: function (req, res, next) {
        spiderModel.UpdateSpider(req, res, next);

    },
    DeleteSpider: function (req, res, next) {
        spiderModel.DeleteSpider(req, res, next);

    },
    AddSpider: function (req, res, next) {
        spiderModel.AddSpider(req, res, next);

    },
    getdetail:function(req,res,next){
        spiderModel.getdetail(req, res, next);
    }

};