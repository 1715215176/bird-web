<template>
  <div class="news-warp">
    <el-card class="crad">
      <h4>{{ newsInfo.titleName }}</h4>
      <div class="base-info">
        <div class="date">发布日期:{{ newsInfo.date }}</div>
        <div class="date">来源:{{ newsInfo.fuName }}</div>
        <div class="date">作者: 超级管理员</div>
      </div>
      <p v-for="(item, index) in contentList" :key="index">
        <img :src="newsInfo.imageUrl" alt="" v-if="index === 1" class="image" />
        {{ item }}
      </p>
      <div class="bottom-warp">
        <span @click="likeBtn"
          >{{ isDianzan ? "已点赞" : "点赞"
          }}<i class="el-icon-thumb mr10">: {{ newsInfo.star }}</i></span
        >
        <span
          >浏览<i class="el-icon-s-opportunity mr10"
            >: {{ newsInfo.browseNum }}</i
          ></span
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsInfo: {},
      id: this.$route.query.id,
      contentList: [],
      isDianzan: false,
    };
  },
  async mounted() {
    await this.getNewsList();
    this.browseNumAdd();
    const userInfo = JSON.parse(localStorage.getItem("hotelUserInfo"));
    if (userInfo.starList) {
      this.stars = userInfo.starList.split(",");
    } else {
      this.stars = [];
    }
    const index = this.stars.findIndex((v) => Number(v) === Number(this.id));
    if (index > -1) {
      this.isDianzan = true;
    }
  },
  methods: {
    async getNewsList() {
      const res = await this.$axios.post("/api/news/getNewsList", {
        id: this.id,
      });
      if (res.code === "200") {
        this.newsInfo = res.data;
        this.contentList = res.data.content.split("\n");
      }
    },
    /** 进来页面浏览量加一 */
    async browseNumAdd() {
      const params = {
        id: this.id,
        browseNum: this.newsInfo.browseNum + 1,
      };
      this.$axios.post("/api/news/browseNumAdd", params);
    },
    /** 点赞 */
    async likeBtn() {
      const userInfo = JSON.parse(localStorage.getItem("hotelUserInfo"));
      const index = this.stars.findIndex((v) => Number(v) === Number(this.id));
      if (index > -1) {
        this.$message.warning("不能重复点赞~");
        return;
      } else {
        this.stars.push(this.id);
        userInfo.starList = this.stars.join(",");
        localStorage.setItem("hotelUserInfo", JSON.stringify(userInfo));
      }
      const params = {
        id: this.id,
        star: this.newsInfo.star + 1,
        stars: this.stars.join(","),
        userId: userInfo.userId,
      };
      await this.$axios.post("/api/news/likeNumAdd", params);
      this.getNewsList();
    },
  },
};
</script>

<style lang="less" scoped>
.news-warp {
}
.crad {
  margin: 10px auto;
  width: 800px;
}
.base-info {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  font-size: 12px;
  color: #000;
  display: flex;
  justify-content: space-between;
  background-color: rgb(211, 253, 147);
}
.date {
  color: #000;
}
p {
  text-align: left;
  text-indent: 2em;
  margin-top: 10px;
}
.image {
  width: 100%;
  height: 400px;
  margin-left: -30px;
}
.bottom-warp {
  text-align: right;
}
.mr10 {
  margin-right: 10px;
}
</style>
