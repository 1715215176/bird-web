<template>
  <el-card shadow="never">
    <span slot="header">新闻列表</span>
    <div class="table-warp">
      <el-table
        :data="newsList"
        border
        stripe
        v-loading="loading"
        :header-cell-style="headStyle"
      >
        <el-table-column label="新闻名称" min-width="200">
          <template slot-scope="scope">
            <span class="blue pointer">{{ scope.row.titleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.fuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主题图片" width="400">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" class="image" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-popconfirm
              :title="`确定将该房型删除吗?`"
              @confirm="confirmDeleteRoom(scope.row.id)"
            >
              <span class="red ml10 pointer" slot="reference">删除</span>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      headStyle: {
        background: "#dfe4ea",
      },
    };
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      const res = await this.$axios.post("/api/news/getNewsList");
      if (res.code === "200") {
        this.newsList = res.data;
        this.newsList.forEach((item) => {
          item.date = this.$moment(item.date).format("YYYY-MM-DD hh:mm:ss");
        });
      }
    },
    async confirmDeleteRoom(id) {
      const res = await this.$axios.post("/api/news/deleteNews", { id });
      if (res.code === "200") {
        this.$message.success("删除成功~");
        this.getNewsList();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.image {
  width: 300px;
  height: 200px;
}
</style>
