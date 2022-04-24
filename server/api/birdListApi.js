const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const connection = mysql.createConnection(config);
connection.connect();
/** 获取全部列表 */
router.get("/getBirdList", (req, res) => {
  // const params = req.body;
  const sql = "select * from bird_list";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      const data = {
        code: "400",
        data: "",
        message: "系统异常",
      };
      res.send(data);
    }
    if (result) {
      const resultMap = result.map((v) => {
        return {
          id: v.id,
          name: v.name,
          imgUrl: v.img_url,
        };
      });
      const data = {
        code: "200",
        data: resultMap,
        message: "",
      };
      res.send(data);
    }
  });
});

/**获取详情 */
router.post("/getBirdDetail", (req, res) => {
  const params = req.body;
  const sql = `select * from bird_list where id = ${params.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      const data = {
        code: "400",
        data: "",
        message: "系统异常",
      };
      res.send(data);
    }
    if (result) {
      const resultMap = result.map((v) => {
        return {
          id: v.id,
          name: v.name,
          fuTitle: v.fu_title,
          content: v.content,
          imgUrl: v.img_url,
          features: v.features,
          perchEnv: v.perch_env,
          breedingMode: v.breeding_mode,
          area: v.area,
          lifeHabie: v.life_habie,
        };
      });
      const data = {
        code: "200",
        data: resultMap[0],
        message: "",
      };
      res.send(data);
    }
  });
});

// 保存图片
router.post("/upload", (req, res) => {
  const params = req.body;
  const sql = `insert into bird_list (name, fu_title, content, img_url, features, perch_env, breeding_mode, area, life_habie) values ('${params.name}', '${params.fuTitle}', '${params.content}', '${params.imgUrl}', '${params.features}','${params.perchEnv}', '${params.breedingMode}', '${params.area}','${params.lifeHabie}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      const data = {
        code: "400",
        message: "系统异常",
      };
      res.send(data);
    }
    if (result) {
      const data = {
        code: "200",
        data: "",
        message: "保存成功",
      };
      res.send(data);
    }
  });
});
module.exports = router;
