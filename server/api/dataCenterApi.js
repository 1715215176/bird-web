const mysql = require("mysql");
const config = require("../config");
const express = require("express");
const router = express.Router();
const connection = mysql.createConnection(config);
connection.connect();

/** 获取轮播图列表 */
router.post("/getSwiperList", (req, res) => {
  const params = req.body;
  let sql = "select * from swiper_list where 1=1";
  if (params.swiperName) {
    sql = sql + ` and swiper_name='${params.swiperName}'`;
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ code: "400", message: "系统异常" });
    }
    if (result) {
      const mapData = result.map((item) => {
        return {
          id: item.id,
          swiperName: item.swiper_name,
          swiperUrl: item.swiper_url,
          swiperId: item.swiper_id,
          state: item.state,
        };
      });
      const data = {
        code: "200",
        data: mapData,
        message: "",
        total: mapData.length,
      };
      res.send(data);
    }
  });
});
/** 保存轮播图 */
router.post("/saveSwiper", (req, res) => {
  const params = req.body;
  let sql = "";
  if (params.id) {
    sql = `update swiper_list set swiper_name='${params.swiperName}', swiper_url='${params.swiperUrl}', swiper_id=${params.swiperId}, state=${params.state} where id=${params.id}`;
  } else {
    sql = `insert into swiper_list (swiper_name,swiper_url,swiper_id,state) values ('${params.swiperName}','${params.swiperUrl}',${params.swiperId},${params.state})`;
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ code: "400", message: "系统异常" });
    }
    if (result) {
      const data = {
        code: "200",
        data: "",
        message: "",
      };
      res.send(data);
    }
  });
});
// 修改轮播图状态
router.post("/updateState", (req, res) => {
  const parms = req.body;
  const sql = `update swiper_list set state=${parms.state} where id=${parms.id}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let data = {
        data: "",
        code: "200",
      };
      res.send(data);
    }
  });
});
// 删除轮播图
router.post("/deleteSwiper", (req, res) => {
  const parms = req.body;
  const sql = `delete from swiper_list where id=${parms.id}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let data = {
        data: "",
        code: "200",
      };
      res.send(data);
    }
  });
});
// 获取房型数据
router.post("/getSwiperById", (req, res) => {
  const parms = req.body;
  const sql = `select * from swiper_list where id=${parms.id}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      const mapData = result.map((item) => {
        return {
          id: item.id,
          swiperName: item.swiper_name,
          swiperUrl: item.swiper_url,
          swiperId: item.swiper_id,
          state: item.state,
        };
      });
      let data = {
        data: mapData[0],
        code: "200",
        message: "",
      };
      res.send(data);
    }
  });
});
module.exports = router;
