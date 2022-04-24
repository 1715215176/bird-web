<template>
  <div class="list-bg">
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
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    getBirdDetail(id) {
      this.$router.push({ name: "BirdDetail", query: { id } });
    },
    async search() {
      const res = await this.$axios.get("/api/bird/getBirdList");
      console.log(res);
      if (res.code === "200") {
        console.log(res.data);
        this.birdList = res.data;
      }
    },
    reset() {
      this.bridName = "";
      this.birdList = JSON.parse(localStorage.getItem("birdList")) || [];
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
</style>
