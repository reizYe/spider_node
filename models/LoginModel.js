var common = require('../utils/common');
var Cap = require('svg-captcha');
var loginModel = {};

loginModel.login = function (req, res, next) {
    var sql = 'update login set last_login_time = ? WHERE name = ? and password = ? and status != 2';
    // var param = req.query || req.params;
    var param = req.body;
    var login_time = common.dateToStr(new Date());
    var arrParams = [login_time, param.name, param.password];
    if (param) {
        common.connect(res, sql, arrParams);
    } else {
        common.connect(res, sql);
    }

}
loginModel.code = function (req, res, next) {
    
    var code = Cap.create({
        // 翻转颜色
        inverse: false,
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 3,
        ignoreChars: '0o1i',
        color: false,
        background: '#ff00ff'
    });
    // 保存到session,忽略大小写
   
    // 返回数据直接放入页面元素展示即可
   
    res.send(code.data);
}
module.exports = loginModel;