<template>
  <el-card shadow="never">
    <span slot="header">新增</span>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      :inline="false"
      size="small"
    >
      <el-form-item label="名字：">
        <el-input v-model="form.name" class="w200"></el-input>
      </el-form-item>
      <el-form-item label="别名：">
        <el-input v-model="form.fuTitle" class="w200"></el-input>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input
          v-model="form.content"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="特征：">
        <el-input
          v-model="form.features"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="生活环境：">
        <el-input
          v-model="form.perchEnv"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="生活习性：">
        <el-input
          v-model="form.lifeHabie"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="繁衍方式：">
        <el-input
          v-model="form.breedingMode"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="分布范围：">
        <el-input
          v-model="form.area"
          type="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          action="/api/upload/uploadImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :http-request="upload"
          :file-list="birdList"
          :limit="1"
          :on-exceed="max"
          :class="{ hide: birdList.length > 0 }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <div class="btn-warp">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        fuTitle: "",
        content: "",
        features: "",
        perchEnv: "",
        lifeHabie: "",
        breedingMode: "",
        area: "",
        imgUrl: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {},
      birdList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(e) {
      console.log(e);
      let formData = new FormData();
      formData.append("file", e.file);

      this.$axios({
        method: "post",
        url: "/api/upload/uploadImg",
        data: formData,
      }).then((res) => {
        console.log(res);
        //上传成功之后 显示图片
        this.form.imgUrl = res.fileSqlUrl;
      });
    },
    async save() {
      const res = await this.$axios.post("/api/bird/upload", this.form);
      if (res.code === "200") {
        this.$message.success("新增成功");
        this.$router.push({ name: "BirdList" });
      }
    },
    cancel() {
      this.$router.push({ name: "Home" });
    },
    max() {
      this.$message.error("只能上传一张图片");
    },
  },
};
</script>

<style>
.w200 {
  width: 200px;
}
.hide ::v-deep .el-upload--picture-card {
  display: none;
}
.btn-warp {
  text-align: right;
}
</style>
