const express = require("express");
const mysql = require("mysql");
const config = require("../config");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const connection = mysql.createConnection(config);
connection.connect();
// 建立数据库连接
let fileSqlUrl = "http://localhost:9999/";
let fileSqlName = "";
const storage = multer.diskStorage({
  //设置 上传图片服务器位置
  destination: path.resolve(__dirname, "../static"),
  //设置 上传文件保存的文件名
  filename: function (req, file, cb) {
    // 获取后缀扩展
    let extName = file.originalname.slice(file.originalname.lastIndexOf(".")); //.jpg
    // 获取名称
    let fileName = Date.now();
    fileSqlName = fileName + extName;
    fileSqlUrl += fileSqlName;
    // console.log(fileName + extName); //12423543465.jpg
    cb(null, fileName + extName);
  },
});
const fileFilter = function (req, file, cb) {
  const acceptableMime = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  // 限制类型
  // null是固定写法
  if (acceptableMime.indexOf(file.mimetype) !== -1) {
    cb(null, true); // 通过上传
  } else {
    cb(null, false); // 禁止上传
  }
};
const limits = {
  fileSize: "10MB", //设置限制（可选）
};
const imageUploader = multer({
  fileFilter,
  storage,
  limits,
}).single("file"); //文件上传预定 name 或者 字段
// 图片
router.post("/uploadImg", imageUploader, (req, res) => {
  connection.query(
    `insert into img_list (img_url) values('${fileSqlUrl}')`,
    (err) => {
      if (err) {
        res.send({ err: 1, msg: "增加数据失败", code: "400" });
        res.end();
      } else {
        res.send({ err: 0, msg: "添加成功", code: "200", fileSqlUrl });
        res.end();
      }
      fileSqlUrl = "http://localhost:9999/";
    }
  );
});

module.exports = router;
