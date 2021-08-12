<template>
  <el-card class="information">
    <div class="header">
      <el-card class="header-item">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <el-descriptions>
          <el-descriptions-item label="姓名:">苏炳添</el-descriptions-item>
          <el-descriptions-item label="学号:">20210996</el-descriptions-item>
          <el-descriptions-item label="班级:">三年二班</el-descriptions-item>
          <el-descriptions-item label="职位:">
            <el-tag size="small">团支书</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="班主任:">袁国强</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="header-item">
        <template #header>
          <div class="card-header">
            <span>校园卡状态</span>
          </div>
        </template>
        <el-descriptions>
          <el-descriptions-item label="卡号:">10927</el-descriptions-item>
          <el-descriptions-item label="余额:">52 元</el-descriptions-item>
          <el-descriptions-item label="卡片类型:">
            <el-tag size="small">学生卡</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="业务办理:">学生活动中心一楼102室</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="header-item">
        <template #header>
          <div class="card-header">
            <span>课程表</span>
          </div>
        </template>
        <el-button type="primary" icon="el-icon-notebook-2" @click="checkTable">点击查看课程表</el-button>
      </el-card>
    </div>
  <el-tabs type="border-card" @tab-click="loadChart" v-model="activeName">
    <el-tab-pane label="成绩涨跌" class="tagBox" name="all"><div id="all" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——语文" class="tagBox" name="chinese"><div id="chinese" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——数学" class="tagBox" name="math"><div id="math" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——英语" class="tagBox" name="english"><div id="english" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——物理" class="tagBox" name="physics"><div id="physics" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——化学" class="tagBox" name="chemistry"><div id="chemistry" class="tagBox"></div></el-tab-pane>
    <el-tab-pane label="得分详情——生物" class="tagBox" name="biology"><div id="biology" class="tagBox"></div></el-tab-pane>
  </el-tabs>
  
</el-card>
<TianAn ref="tableC"></TianAn>
</template>

<script>
import { ref,reactive,onMounted } from 'vue'
import TianAn from '../components/TianAn.vue'
import * as chart from 'echarts'
import axios from '../utils/axios'

let myChart = null

export default {
  components:{
    TianAn
  },

  setup() {
    const loadChart = (e) => {
      if(myChart) {
        myChart.dispose()
      }
      console.log(e.props.name)
      axios.get(`/chart/score/${e.props.name}`)
      .then((res) => {
      const option = res.data
      myChart = chart.init(document.getElementById(`${e.props.name}`));
      myChart.setOption(option);
      }).catch((x) => {
        console.log(x)
      })
    }
    const initChart = () => {
      if(myChart) {
        myChart.dispose()
      }
      axios.get(`/chart/score/${state.activeName}`)
      .then((res) => {
      const option = res.data
      myChart = chart.init(document.getElementById(`${state.activeName}`));
      myChart.setOption(option);
      }).catch((x) => {
        console.log(x)
      })
    }
     const tableC = ref(null)
     const checkTable = () => {
       tableC.value.open()
     }
     const state = reactive({
      activeName:"all"
     })
     onMounted(() => {
       initChart()
     })
      return {
        ...state,
        checkTable,
        loadChart,
        tableC
      }
  }
}
</script>

<style scoped>
  .information .header {
    display: flex;
    margin-bottom: 50px;
  }
  .information .header .header-item {
    flex: 1;
    margin-right: 20px;
  }
  .information .header .header-item:last-child {
    margin-right: 0;
  }
  .tagBox {
    height: 320px;
  }
</style>