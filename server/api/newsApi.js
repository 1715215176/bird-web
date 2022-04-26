const mysql = require("mysql");
const config = require("../config");
const express = require("express");
const moment = require("moment");
const router = express.Router();
const connection = mysql.createConnection(config);
connection.connect();

/** 保存轮播图 */
router.post("/saveNews", (req, res) => {
  const params = req.body;
  let sql = "";
  if (params.id) {
    sql = `update news_list set swiper_name='${params.swiperName}', swiper_url='${params.swiperUrl}', swiper_id=${params.swiperId}, state=${params.state} where id=${params.id}`;
  } else {
    sql = `insert into news_list (title_name,fu_name, image_url,content, date) values ('${params.titleName}','${params.fuTitleName}','${params.swiperUrl}','${params.content}','${params.date}')`;
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
/** 获取新闻列表 */
router.post("/getNewsList", (req, res) => {
  const params = req.body;
  let sql = "";
  if (params.id) {
    sql = `select * from news_list where id=${params.id}`;
  } else {
    sql = "select * from news_list";
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ code: "400", message: "系统异常" });
    }
    if (result) {
      const mapData = result.map((v) => {
        return {
          id: v.id,
          titleName: v.title_name,
          fuName: v.fu_name,
          imageUrl: v.image_url,
          star: v.star,
          browseNum: v.browse_num,
          date: moment(v.date).format("YYYY-MM-DD hh:mm:ss"),
          content: v.content,
        };
      });
      const data = {
        code: "200",
        data: params.id ? mapData[0] : mapData,
        message: "",
      };
      res.send(data);
    }
  });
});
// 删除轮播图
router.post("/deleteNews", (req, res) => {
  const parms = req.body;
  const sql = `delete from news_list where id=${parms.id}`;
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
// 浏览量
router.post("/browseNumAdd", (req, res) => {
  const parms = req.body;
  const sql = `update news_list set browse_num='${parms.browseNum}' where id=${parms.id}`;
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
// 浏览量
router.post("/likeNumAdd", (req, res) => {
  const parms = req.body;
  const sql = `update news_list set star='${parms.star}' where id=${parms.id}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      const sql = `update user set like_news='${parms.stars}' where user_id='${parms.userId}'`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          console.log("点赞文章加入成功~");
        }
      });
      let data = {
        data: "",
        code: "200",
      };
      res.send(data);
    }
  });
});
module.exports = router;
