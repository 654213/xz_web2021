//引入express
const express = require("express");
//引入连接池模块
const pool = require("../pool.js");
//创建路由器对象
const r = express.Router();
//用户注册模块(/post /v1/regin)
r.post('/v1/regin', (req, res, next) => {
    var obj = req.body;
    console.log(obj);
    pool.query('insert into xz_user (uid,uname,upwd) values(null,?,?)', [obj.uname, obj.upwd], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        if (result.affectedRows === 1) {
            //res.send({ code: 200, msg: "注册成功" });
            res.send("1");
        } else if (result.affectedRows === 0) {
            //res.send({ code: 201, msg: "注册失败" });
            res.send("0");
        }
    });
});

//2.查询用户列表
r.get("/v1/list", (req, res) => {
    var sql = "select * from xz_user";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result); //表->字符串json
    });
});
//3.根据uid删除用户
r.delete("/v1/delUser", (req, res) => {
    var _uid = req.query.uid;
    var sql = "delete from xz_user where uid=?";
    pool.query(sql, [_uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});
//根据uid查询用户信息
r.get("/v1/search", (req, res) => {
    var _uid = req.query.uid;
    var sql = "select * from xz_user where uid=?";
    pool.query(sql, [_uid], (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});
//根据uid修改用户信息
r.put("/v1/update", (req, res) => {
    var obj = req.body;
    var sql = "update xz_user set email = ? where uid=?";
    console.log(sql, obj);
    pool.query(sql, [obj.email, obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//注册用户
r.post("/v1/ref", (req, res) => {
    var obj = req.body;
    var sql = "INSERT INTO xz_user (uid,uname,upwd) VALUES(null,?,?)";
    console.log(obj);
    pool.query(sql, [obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});
//判断用户名是否存在
r.get("/v1/isexists", (req, res) => {
    var obj = req.query;
    var sql = "SELECT uid FROM xz_user WHERE uname = ?";
    console.log(sql, obj);
    pool.query(sql, [obj.uname], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});
module.exports = r;