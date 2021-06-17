const express = require('express');
//引入连接池模块
const pool = require('../pool.js');
//创建路由器对象
const r = express.Router();
r.get("/v1/s2", (req, res) => {
    res.send("get_ok")
});
r.post("/v1/s3", (req, res) => {
    res.send("post_ok")
});
r.put("/v1/s4", (req, res) => {
    res.send("put_ok")
});
r.delete("/v1/s5", (req, res) => {
    res.send("delete_ok" + req.query.uid);
});

r.get("/v1/s6", (req, res) => {
    var uname = req.query.uname;
    res.send("get_data:" + uname + req.query.uid)
});
r.post("/v1/s7", (req, res) => {
    var uname = req.body.uname;
    res.send("post_data:" + uname)
});



//导出路由器对象
module.exports = r;