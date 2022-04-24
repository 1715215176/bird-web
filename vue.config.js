const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("public", resolve("public"));
  },
  devServer: {
    proxy: {
      "/api": {// 凡是见到/api开头的，都认为跨域代理
        target: "http://localhost:9999",// 跨域的目标接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "",// /api在请求的时候自动转换为空
        },
        logLevel: 'debug'
      },
      "/upload": {
        target: 'https://jsonplaceholder.typicode.com/posts/',
        changeOrigin: true,
        pathRewrite: {
          "^/upload": "",
          logLevel: 'debug'
        }
      }
    },
  }
}