<template>
  <div>
    <div id="echarts"></div>
    <el-row type="flex">
      <div class="echarts-item">
        <div id="echarts1"></div>
      </div>
      <div class="echarts-item">
        <div id="echarts2"></div>
      </div>
      <el-card class="echarts-item">
        <span slot="header">新闻列表</span>
        <div
          v-for="item in newsList"
          :key="item.id"
          class="news-item"
          @click="newsDetaol(item.id)"
        >
          <div class="title-name">{{ item.titleName }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      newsList: [],
    };
  },
  /** 页面加载会执行这个方法 */
  mounted() {
    this.init();
    this.init1();
    this.init2();
    this.getNewsList();
  },
  methods: {
    init() {
      const chartDom = document.getElementById("echarts");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "已灭绝鸟类 与 濒临灭绝鸟类",
          subtext: "Fake Data",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["已灭绝鸟类", "濒危灭绝"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981'],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "已灭绝鸟类",
            type: "bar",
            data: [
              9.0, 24.0, 17.0, 20.0, 44.0, 30.0, 21.0, 43.0, 32.0, 20.0, 25.0,
              19.0,
            ],
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "濒危灭绝",
            type: "bar",
            data: [
              22.0, 25.0, 39.0, 60.0, 75.0, 70.0, 55.0, 67.0, 44.0, 78.0, 76.0,
              48.0,
            ],
            markPoint: {
              data: [
                { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    /** 统计近些年灭绝的鸟类 */
    init1() {
      const chartDom = document.getElementById("echarts1");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "近几年灭绝的鸟类数量",
          subtext: "Fake Data",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["2000", "2001", "2002", "2003", "2004", "2005", "2006"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              97,
              {
                value: 164,
                itemStyle: {
                  color: "#a90000",
                },
              },
              123,
              80,
              65,
              89,
              114,
            ],
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    },
    // 鸟类占比饼图
    init2() {
      const chartDom = document.getElementById("echarts2");
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "现存的鸟类" },
              { value: 735, name: "灭绝的鸟类" },
              { value: 580, name: "濒临灭绝的鸟类" },
              { value: 484, name: "等级保护鸟类" },
              { value: 300, name: "未被保护的鸟类" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    async getNewsList() {
      const res = await this.$axios.post("/api/news/getNewsList");
      if (res.code === "200") {
        this.newsList = res.data;
        this.newsList.forEach((item) => {
          item.date = this.$moment(item.date).format("YYYY-MM-DD hh:mm:ss");
        });
      }
    },
    newsDetaol(id) {
      this.$router.push({ name: "newsDetail", query: { id } });
    },
  },
};
</script>

<style scope>
#echarts {
  height: 400px;
  width: 100%;
  background-color: #fff;
}
.echarts-item {
  flex: 1;
  margin-right: 10px;
  height: 400px;
}
#echarts1 {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 10px;
}
#echarts2 {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 10px;
}
.el-card {
  margin-top: 10px;
}
.news-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ccc;
  cursor: pointer;
  height: 40px;
  align-items: center;
}
.title-name {
  display: -moz-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.date {
  color: #ccc;
}
</style>
