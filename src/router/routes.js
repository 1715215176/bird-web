const routes = [
  {
    path: "/",
    name: "dataCenter",
    meta: {
      title: "数据中心",
      icon: "el-icon-menu",
      showInMenu: true,
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        meta: {
          title: "首页",
          icon: "",
          showInMenu: true,
        },
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/home/BirdHome.vue"),
      },
    ],
  },
  {
    path: "/birdMessage",
    name: "birdMessage",
    meta: {
      title: "鸟类信息管理",
      icon: "el-icon-s-unfold",
      showInMenu: true,
    },
    redirect: "/birdMessage/addBird",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/views/Layout.vue"),
    children: [
      {
        path: "/birdMessage/addBird",
        name: "addBird",
        meta: {
          title: " 新增鸟类",
          icon: "",
          showInMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "Main" */ "@/views/bridMenegement/AddBird.vue"
          ),
      },
      {
        path: "/birdMessage/birdList",
        name: "BirdList",
        meta: {
          title: "鸟类列表",
          icon: "",
          showInMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "hotelMenegement" */ "@/views/bridMenegement/BirdList"
          ),
      },
      {
        path: "/birdMessage/birdDetail",
        name: "BirdDetail",
        meta: {
          title: "鸟类详情",
          icon: "",
          showInMenu: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "RoomPanel" */ "@/views/bridMenegement/BirdDetail"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      showInMenu: false,
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/views/Login.vue"),
  },
];

export default routes;