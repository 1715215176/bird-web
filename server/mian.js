const path = require("path");
const express = require("express");
const app = express();
const port = 9999;

const birdListApi = require("./api/birdListApi");
const uploadApi = require("./api/uploadApi");
const userApi = require("./api/userApi");
const dataCenterApi = require("./api/dataCenterApi");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bird", birdListApi);
app.use("/upload", uploadApi);
app.use("/user", userApi);
app.use("/dataCenter", dataCenterApi);

app.use(express.static(path.join(__dirname, "static")));
app.listen(port, () => console.log("9999端口已启动。。。。。"));
