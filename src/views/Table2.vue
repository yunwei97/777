<template>
    <el-card class="scope-card">
        <template #header>
          <div class="scope-card-header">
            <span>成绩排名</span>
            <el-switch v-model="switchOn"
             :loading="loading" 
             @change="loadScope" 
             active-text="查看理科成绩" 
             inactive-text="查看文科成绩"
             active-color="#8bbcfd"
             inactive-color="#fd8b8b"
             >
            </el-switch>
          </div>
        </template>
        <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      >
      <el-table-column
        prop="stNum"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="chinese"
        label="语文"
      >
      </el-table-column>
      <el-table-column
        prop="math"
        label="数学"
      >
      </el-table-column>
      <el-table-column
        prop="english"
        label="英语"
      >
      </el-table-column>
      <el-table-column
        prop="course1"
        :label="subject1"
      >
      </el-table-column>
      <el-table-column
        prop="course2"
        :label="subject2"
      >
      </el-table-column>
      <el-table-column
        prop="course3"
        :label="subject3"
      >
      </el-table-column>
      <el-table-column
        prop="totalscore"
        label="总分"
      >
      </el-table-column>
      
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange" 
    />
      </el-card>
</template>

<script>
import { reactive,toRefs,onMounted } from 'vue'
import axios from '../utils/axios.js'
import { ElMessage } from 'element-plus'

export default {
    methods: {
      tableRowClassName({row}) {
        if (row.stNum === 20210996) {
          return 'my-row';
        }
        return '';
      }
    },
    setup() {
        const state =reactive({
            tableData: [],
            pageSize: 10,
            total: 0,
            currentPage: 1,
            loading: false,
            switchOn: true,
            subject1: "综合科目1",
            subject2: "综合科目2",
            subject3: "综合科目3"
        })
        const compareX = (atri) => {
            return function(a,b) {
                let value1 = a[atri];
                let value2 = b[atri];
                return value2 - value1
            }
        }
        const handleCurrentChange = (cpage) => {
            state.currentPage = cpage
        }
        const handleSizeChange = (psize) => {
            state.pageSize = psize
        }
        const loadScope = () => {
            let sub = ""
            if(state.switchOn === true) {
              sub = "science"
            } else {
              sub = "liberal"
            }
            state.loading = true
            axios.get(`/${sub}`)
            .then((res) => {
                state.tableData = res.tableData.sort(compareX("totalscore"));
                state.pageSize = res.pageSize;
                state.total = res.total;
                state.subject1 = res.subject1;
                state.subject2 = res.subject2;
                state.subject3 = res.subject3;
                state.loading = false
            }).catch((e) => {
                console.log(e)
            })
        }
        onMounted(() => {
          ElMessage({
            message:"通过右侧的开关按钮以切换文/理科排名👉",
            offset: 50,
            type: "warning"
          })
          loadScope()
        })
        return {
            ...toRefs(state),
            loadScope,
            handleCurrentChange,
            handleSizeChange
        }
    }
    }
</script>

<style scoped>
    .scope-card {
        margin: 10px;
    }
    .scope-card .scope-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>

<style>
  .el-table .my-row {
    background: rgba(128, 182, 253, 0.315);
    color: #8bbcfd
  }
</style>