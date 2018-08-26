var mysql = require('mysql');
var config = require('../DataBase/config');
var pool = mysql.createPool(config.mysql);
var loginModel = {};
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '400',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

function dateToStr(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1; //js从0开始取 
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }

    var time = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second; //2009-06-12 17:18:05
    // alert(time);
    return time;
}

function connect(res, sql, params) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  

        // 建立连接 增加一个用户信息 
        connection.query(sql, params, function (err, result) {
            if (err) {
                var re = {
                    code: 400,
                    msg: err
                };
            } else {
                var re = {
                    code: 200,
                    msg: '查询成功',
                    data: result
                };
            }
            // 以json形式，把操作结果返回给前台页面   
            res.json(re);
            // responseJSON(res, re);
            // 释放连接  
            connection.release();

        });
    });

}
loginModel.login = function (req, res, next) {
    var sql = 'update login set last_login_time = ? WHERE name = ? and password = ? and status != 2';
    // var param = req.query || req.params;
    var param = req.body;
    var login_time = dateToStr(new Date());
    var arrParams = [login_time, param.name, param.password];
    if (param) {
        connect(res, sql, arrParams);
    } else {
        connect(res, sql);
    }

}
module.exports = loginModel;