<template>
  <div class="list-bg">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in swiperList" :key="item.id">
        <img
          :src="item.swiperUrl"
          alt=""
          class="swiper-image"
          @click="getBirdDetail(item.swiperId)"
        />
      </el-carousel-item>
    </el-carousel>
    <div class="search-warp">
      <el-input
        v-model="bridName"
        placeholder="请输入鸟类的名字"
        size="small"
        clearable
        class="w200"
      ></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </div>
    <div class="bird-warp">
      <div
        v-for="(item, index) in birdList"
        :key="index"
        class="bird-item"
        @click="getBirdDetail(item.id)"
      >
        <img :src="item.imgUrl" class="bird-image" />
        <div class="bird-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birdList: [],
      bridName: "",
      swiperList: [],
    };
  },
  mounted() {
    this.search();
    this.getSwiperList();
  },
  methods: {
    getBirdDetail(id) {
      this.$router.push({ name: "BirdDetail", query: { id } });
    },
    async search() {
      const res = await this.$axios.get("/api/bird/getBirdList");
      if (res.code === "200") {
        console.log(res.data);
        this.birdList = res.data;
      }
    },
    reset() {
      this.bridName = "";
      this.birdList = JSON.parse(localStorage.getItem("birdList")) || [];
    },
    async getSwiperList() {
      const res = await this.$axios.post("/api/dataCenter/getSwiperList", {});
      if (res) {
        this.swiperList = [...res.data].filter((v) => v.state === 1);
        console.log(this.swiperList);
      }
    },
  },
};
</script>

<style scope>
.bird-warp {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 16px;
}
.bird-image {
  width: 100%;
  height: 100%;
}

.bird-item {
  width: 250px;
  height: 250px;
  border: 1px solid #000;
  margin: 10px;
  position: relative;
}
.bird-name {
  text-align: right;
  font-weight: 600;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.w200 {
  width: 200px;
}
.list-bg {
  background-color: #fff;
}
.search-warp {
  margin: 10px;
  padding: 16px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  /* padding: 16px; */
}
.swiper-image {
  width: 100%;
  height: 100%;
}
.el-carousel__container {
  height: 370px !important;
}
</style>
