<template>
  <el-card>
    <span slot="header">新增新闻</span>
    <el-form
      :model="pressData"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="small"
    >
      <el-form-item label="标题:">
        <el-input v-model="pressData.titleName" class="w300"></el-input>
      </el-form-item>
      <el-form-item label="副标题:">
        <el-input v-model="pressData.fuTitleName" class="w300"></el-input>
      </el-form-item>
      <el-form-item label="日期:">
        <el-input v-model="pressData.date" disabled class="w300"></el-input>
      </el-form-item>
      <el-form-item label="主题图片:">
        <el-upload
          action="/api/upload/uploadImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :http-request="upload"
          :file-list="upLoadImage"
          :limit="1"
          :on-exceed="max"
          :class="{ hide: Boolean(pressData.swiperUrl) }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="imgDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="正文:">
        <el-input
          v-model="pressData.content"
          clearable
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="table-warp">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="save">取消</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pressData: {
        titleName: "",
        fuTitleName: "",
        date: this.$moment().format("YYYY-MM-DD hh:mm:ss"),
        swiperUrl: "",
        content: "",
      },
      upLoadImage: [],
      rules: {},
      imgDialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    async save() {
      const res = await this.$axios.post("/api/news/saveNews", this.pressData);
      if (res.code === "200") {
        this.$message.success("保存成功~");
        this.$router.push({ name: "Home" });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.pressData.swiperUrl = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      const res = await this.$axios.post("/api/upload/uploadImg", formData);
      if (res.code === "200") {
        this.pressData.swiperUrl = res.fileSqlUrl;
        console.log(this.pressData.swiperUrl);
      }
    },
    max() {
      this.$message.error("只能上传一张图片");
    },
  },
};
</script>

<style lang="less" scoped>
.w300 {
  width: 300px;
}
.hide ::v-deep .el-upload--picture-card {
  display: none;
}
.table-warp {
  text-align: right;
}
</style>
