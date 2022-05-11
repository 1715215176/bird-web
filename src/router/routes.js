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
    path: "/dataset",
    name: "dataset",
    meta: {
      title: "数据配置",
      icon: "el-icon-s-tools",
      showInMenu: true,
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
    redirect: "/dataset/swiperSet",
    children: [
      {
        path: "/dataset/swiperSet",
        meta: {
          title: "轮播图配置",
          icon: "",
          showInMenu: true,
        },
        name: "swiperSet",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "@/views/dataCenter/SwiperSet.vue"
          ),
      },
      {
        path: "/dataset/PressCenter",
        meta: {
          title: "新闻配置",
          icon: "",
          showInMenu: true,
        },
        name: "PressCenter",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "@/views/dataCenter/PressCenter.vue"
          ),
      },
      {
        path: "/dataset/newsDetail",
        meta: {
          title: "新闻详情",
          icon: "",
          showInMenu: false,
        },
        name: "newsDetail",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "@/views/dataCenter/newsDetail.vue"
          ),
      },
      {
        path: "/dataset/newsList",
        meta: {
          title: "新闻列表",
          icon: "",
          showInMenu: true,
        },
        name: "newsList",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "@/views/dataCenter/NewsList.vue"
          ),
      },
    ],
  },
  {
    path: "/userMenegement",
    name: "userMenegement",
    meta: {
      title: "用户管理",
      icon: "el-icon-s-custom",
      showInMenu: true,
    },
    redirect: "/userMenegement/userList",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
    children: [
      {
        path: "/userMenegement/userList",
        name: "userList",
        meta: {
          title: "用户列表",
          icon: "",
          showInMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "hotelMenegement" */ "@/views/userMenegement/UserList.vue"
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
  {
    path: "/404",
    name: "Error404",
    meta: {
      title: "无权限",
      showInMenu: false,
    },
    component: () => import(/* webpackChunkName: "Layout" */ "@/views/404.vue"),
  },
];

export default routes;
