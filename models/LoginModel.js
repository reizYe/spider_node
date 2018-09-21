var common = require('../utils/common');
var Cap = require('svg-captcha');
var loginModel = {};

loginModel.login = function (req, res, next) {
    // update login set last_login_time = ? WHERE name = ? and password = ? and status != 2;
    var sql = 'select * from login WHERE name = ? and password = ?';
    // var param = req.query || req.params;
    var param = req.body;
    var msg = "登陆成功"
    var login_time = common.dateToStr(new Date());
    var arrParams = [param.name, param.pass];
    if (param) {
        common.connect(res, sql, arrParams, msg);
    } else {
        common.connect(res, sql, msg);
    }
}
loginModel.code = function (req, res, next) {

    var code = Cap.create({
        // 翻转颜色
        inverse: true,
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 2,
        ignoreChars: '0o1i',
        color: true,
        height: 36,
        width: 140,
        background: '#dcdfe6'
    });
    // 保存到session,忽略大小写

    // 返回数据直接放入页面元素展示即可
    res.type('svg');
    res.send(code.data);
}
module.exports = loginModel;