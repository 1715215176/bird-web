import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = JSON.parse(localStorage.getItem("hotelUserInfo"));
  const privilegeList =
    isAuthenticated && isAuthenticated.privilegeList.split(",");
  //路由拦截
  if (isAuthenticated) {
    if (to.path === "/login") {
      next();
    } else {
      //判断是否有用户角色权限信息，如果没有，先获取用户信息来获取用户角色信息，再根据角色权限动态生成路由
      if (!privilegeList.includes(to.name)) {
        if (to.name === "Home") {
          next("/404");
        } else {
          next();
        }
      } else {
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的页面会自动进入404页面
      }
    }
  } else {
    if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
    else next();
  }
  //文档标题处理
  to.meta.title && (document.title = to.meta.title);
});
export default router;
