<template>
  <div class="detail">
    <div class="title-warp">
      <div class="comtent">
        <div class="name">{{ birdDetail.name }}</div>
        <div>{{ birdDetail.fuTitle }}</div>
        <div>
          <h2 class="common-title">特征</h2>
          <div>{{ birdDetail.features }}</div>
          <el-divider content-position="right">特征</el-divider>
        </div>
        <div>
          <h2 class="common-title">简介</h2>
          <div>{{ birdDetail.content }}</div>
          <el-divider content-position="right">简介</el-divider>
        </div>
      </div>
      <div class="image-warp">
        <img :src="birdDetail.imgUrl" alt="" class="image" />
      </div>
    </div>
    <div>
      <h2 class="common-title">生活环境</h2>
      <div>{{ birdDetail.perchEnv }}</div>
      <el-divider content-position="right">生活环境</el-divider>
    </div>
    <div>
      <h2 class="common-title">生活习性</h2>
      <div>{{ birdDetail.lifeHabie }}</div>
      <el-divider content-position="right">生活习性</el-divider>
    </div>
    <div>
      <h2 class="common-title">繁殖方式</h2>
      <div>{{ birdDetail.breedingMode }}</div>
      <el-divider content-position="right">繁殖方式</el-divider>
    </div>
    <div>
      <h2 class="common-title">分布范围</h2>
      <div>{{ birdDetail.area }}</div>
      <el-divider content-position="right">分布范围</el-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birdDetail: {},
    };
  },
  mounted() {
    /** 读取全部的数据 找到当前id的对象 */
    this.getBirdDetail();
  },
  methods: {
    async getBirdDetail() {
      const params = {
        id: this.$route.query.id,
      };
      const res = await this.$axios.post("/api/bird/getBirdDetail", params);
      if (res.code === "200") {
        this.birdDetail = res.data;
      }
    },
  },
};
</script>

<style scope lang="less">
.detail {
  background-color: #fff;
  padding: 16px;
}
.name {
  margin: 0 10px 0 0;
  display: inline;
  font-size: 34px;
  line-height: 1.15;
  font-weight: 400;
  vertical-align: sub;
}
.common-title {
  position: relative;
  padding-left: 10px;
}
.common-title::before {
  position: absolute;
  content: "";
  left: 0px;
  top: 6px;
  height: 23px;
  width: 3px;
  border-left: 5px solid blue;
}
.title-warp {
  display: flex;
}
.image-warp {
  img {
    width: 300px;
    height: 300px;
  }
}
</style>
