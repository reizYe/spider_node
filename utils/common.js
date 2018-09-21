var mysql = require('mysql');
var config = require('../DataBase/config');
var pool = mysql.createPool(config.mysql);

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

    var time = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second; //2019-06-12 17:18:05
    return time;
}

function connect(res, sql, params,msg) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  

        // 建立连接 增加一个用户信息 
        connection.query(sql, params, function (err, result) {
            if (err) {
                var re = {
                    code: 400,
                    msg: err
                };
            } else if(!result.affectedRows&&result.length<1){
                var re = {
                    code: 404,
                    msg: "没有结果"
                }; 
            }
            else {
                if(msg){
                    var re = {
                        code: 200,
                        msg: msg,
                        data: result
                    };
                }else{
                    var re = {
                        code: 200,
                        data: result
                    };  
                }

            }
            // 以json形式，把操作结果返回给前台页面   
            res.json(re);
            // responseJSON(res, re);
            // 释放连接  
            connection.release();

        });
    });

}
module.exports = {
    dateToStr,
    connect
}