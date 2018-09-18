var common = require('../utils/common');
var spiderModel = {};

spiderModel.SpiderList = function (req, res, next) {
    var sql = 'select * from spider_app';
    var msg = "查询成功";
    common.connect(res, sql,msg);

}
spiderModel.AddSpider = function (req, res, next) {
    var sql = 'insert into spider_app (app_name,app_type,app_description,proxy,cookie,rules) values (?,?,?,?,?,?) ';

    var param = req.body.data;
    var msg = "添加成功";
    var arrParams = [param.app_name, param.app_type, param.app_description, param.proxy, param.cookie,param.rules];
    common.connect(res, sql, arrParams,msg);
}
spiderModel.UpdateSpider = function (req, res, next) {
    var sql = 'update spider_app set app_name = ?,app_type=?,app_description=?,proxy=?,cookie=?,update_time=? WHERE id=?';
    var param = req.body;
    var msg = "更新成功";
    var update_time = common.dateToStr(new Date());
    var arrParams = [param.app_name, param.app_type, param.app_description, param.proxy, param.cookie, update_time, param.id];
    common.connect(res, sql, arrParams,msg);
}
spiderModel.DeleteSpider = function (req, res, next) {
    var sql = 'delete from spider_app where id = ?';
    var msg = "删除成功";
    var param = req.params;
    common.connect(res, sql,param.id,msg);

}
module.exports = spiderModel;