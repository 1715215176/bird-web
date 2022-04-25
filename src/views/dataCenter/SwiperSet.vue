<template>
  <el-card>
    <el-row class="search-warp">
      <el-form size="small" @keyup.enter.native="getSwiperList()">
        <el-input
          v-model="searchParams.swiperName"
          placeholder="请输入鸟类名称"
          size="small"
          clearable
          class="w200 mr10"
        ></el-input>
        <el-button type="primary" size="small" @click="getSwiperList()"
          >查询</el-button
        >
        <el-button size="small" @click="reset()">重置</el-button>
      </el-form>
    </el-row>
    <div class="list-warp">
      <div class="table-title">
        <div class="table-name">轮播图列表</div>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addBtn"
          >新增</el-button
        >
      </div>
      <div class="table-warp">
        <el-table
          :data="swiperList"
          border
          stripe
          v-loading="loading"
          :header-cell-style="headStyle"
        >
          <el-table-column label="名称" min-width="200">
            <template slot-scope="scope">
              <span class="blue pointer" @click="edit(scope.row)">{{
                scope.row.swiperName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="400">
            <template slot-scope="scope">
              <img :src="scope.row.swiperUrl" class="image" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="链接" width="400">
            <template slot-scope="scope">
              <span>{{ scope.row.swiperUrl }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="200">
            <template slot-scope="scope">
              <span :class="{ red: scope.row.state === 0 }">{{
                scope.row.state === 1 ? "已启用" : "停用"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <span class="blue ml10 pointer" @click="edit(scope.row)"
                >编辑</span
              >
              <el-popconfirm
                :title="`确定将该房型${
                  scope.row.state === 0 ? '启用' : '停用'
                }吗?`"
                @confirm="confirmSetRoomType(scope.row)"
              >
                <span
                  class="blue ml10 pointer"
                  slot="reference"
                  :class="{ red: scope.row.state !== 0 }"
                  >{{ scope.row.state !== 1 ? "启用" : "停用" }}</span
                >
              </el-popconfirm>
              <el-popconfirm
                :title="`确定将该房型删除吗?`"
                @confirm="confirmDeleteRoom(scope.row)"
              >
                <span class="red ml10 pointer" slot="reference">删除</span>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      @size-change="(val) => getSwiperList(val, 1)"
      @current-change="getSwiperList(searchParams.pageSize, val)"
      :current-page="searchParams.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      class="page"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="新增轮播图" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="swiperInfo"
        ref="form"
        :rules="rules"
        label-width="120px"
        :inline="false"
        size="small"
      >
        <el-form-item label="名称：" prop="swiperName">
          <el-input class="w200" v-model="swiperInfo.swiperName"></el-input>
        </el-form-item>
        <el-form-item label="详情链接：" prop="swiperId">
          <el-select
            v-model="swiperInfo.swiperId"
            placeholder="请选择跳转链接"
            clearable
            filterable
            class="w200"
          >
            <el-option
              v-for="item in birdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片：" prop="roomPeople">
          <el-upload
            action="/api/upload/uploadImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="upload"
            :file-list="upLoadImage"
            :limit="1"
            :on-exceed="max"
            :class="{ hide: Boolean(swiperInfo.swiperUrl) }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-radio v-model="swiperInfo.state" :label="0">禁用</el-radio>
          <el-radio v-model="swiperInfo.state" :label="1">开启</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="confirmAdd"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchParams: {
        swiperName: "",
        pageSize: 10,
        pageIndex: 1,
      },
      birdList: [],
      swiperInfo: {
        name: "",
        swiperName: "",
        swiperUrl: "",
        swiperId: null,
        state: 1,
      },
      headStyle: {
        background: "#dfe4ea",
      },
      activeName: "1",
      loading: true,
      swiperList: [],
      total: 0,
      dialogVisible: false,
      dialogImageUrl: "",
      upLoadImage: [],
      imgDialogVisible: false,
      rules: {
        swiperName: [
          { required: true, message: "名称不能为空", tiggeer: "blur" },
        ],
        swiperId: [
          {
            validator: (rules, value, callback) => {
              if (!value) {
                callback(new Error("详情链接不能为空~"));
              } else {
                callback();
              }
            },
            tiggeer: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.getSwiperList();
    this.getBirdList();
    // this.activeName = this.$route.query.activeName || "1";
  },
  methods: {
    async getSwiperList() {
      const params = {
        ...this.searchParams,
      };
      this.loading = true;
      const res = await this.$axios.post(
        "/api/dataCenter/getSwiperList",
        params
      );
      if (res) {
        this.swiperList = res.data;
        this.total = res.total;
      }
      this.loading = false;
    },
    async getBirdList() {
      const res = await this.$axios.get("/api/bird/getBirdList");
      if (res.code === "200") {
        this.birdList = res.data;
      }
    },
    /** 确认设置房型 */
    async confirmAdd() {
      this.$refs.form.validate((voild) => {
        if (voild) {
          this.save();
        } else {
          this.$message.error("请根据表单提示正确的填写表单内容~");
        }
      });
    },
    async save() {
      const params = {
        ...this.swiperInfo,
      };
      if (!params.swiperUrl) {
        this.$message.error("图片必须上传");
        return;
      }
      const res = await this.$axios.post("/api/dataCenter/saveSwiper", params);
      if (res.code === "200") {
        this.$message.success(`${params.id ? "编辑成功" : "新增成功"}`);
        this.dialogVisible = false;
        this.getSwiperList();
      }
    },
    /** 删除房型 */
    async confirmDeleteRoom(row) {
      const params = {
        id: row.id,
      };
      const res = await this.$axios.post(
        "/api/dataCenter/deleteSwiper",
        params
      );
      if (res.code === "200") {
        this.getSwiperList();
        this.$message.success("删除成功");
      }
    },
    /** 修改当前房型状态 */
    async confirmSetRoomType(row) {
      const params = {
        id: row.id,
        state: row.state === 0 ? 1 : 0,
      };
      const res = await this.$axios.post("/api/dataCenter/updateState", params);
      if (res.code === "200") {
        this.getSwiperList();
        this.$message.success(`${row.state === 0 ? "已开启" : "已停用"}`);
      }
    },
    cancel() {
      this.dialogVisible = false;
    },
    reset() {
      this.searchParams = {
        roomTypeName: "",
        pageSize: 10,
        pageIndex: 1,
      };
      this.getSwiperList();
    },
    async edit(row) {
      this.dialogVisible = true;
      this.upLoadImage = [];
      this.swiperInfo.swiperUrl = "";
      const params = {
        id: row.id,
      };
      const res = await this.$axios.post(
        "/api/dataCenter/getSwiperById",
        params
      );
      if (res.code === "200") {
        this.swiperInfo = res.data;
        this.upLoadImage.push({ url: res.data.swiperUrl });
      }
    },
    addBtn() {
      this.upLoadImage = [];
      this.dialogVisible = true;
      this.swiperInfo = {
        name: "",
        swiperName: "",
        swiperUrl: "",
        swiperId: null,
        state: 1,
      };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.swiperInfo.swiperUrl = "";
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
        this.swiperInfo.swiperUrl = res.fileSqlUrl;
        console.log(this.swiperInfo.swiperUrl);
      }
    },
    max() {
      this.$message.error("只能上传一张图片");
    },
  },
};
</script>

<style lang="less" scoped>
.common {
  font-size: 14px;
}
.search-warp {
  border: 1px solid #f0f0f0;
  padding: 16px;
}
.list-warp {
  margin-top: 20px;
  border: 1px solid #f0f0f0;
}
.table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.table-warp {
  padding: 16px;
}
.el-table {
  border: 1px solid #f0f0f0;
}
.page {
  text-align: right;
  margin-top: 10px;
}
.blue {
  color: rgb(45, 140, 240);
}
.red {
  color: rgb(237, 80, 80);
}
.pointer {
  cursor: pointer;
}
.w200 {
  width: 200px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
}
::v-deep .el-dialog__body {
  padding: 20px 30px;
}
.hide ::v-deep .el-upload--picture-card {
  display: none;
}
.image {
  width: 300px;
  height: 200px;
}
.ml10 {
  margin-left: 10px;
}
</style>
