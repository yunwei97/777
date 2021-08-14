<template>
    <el-card class="scope-card">
        <template #header>
          <div class="scope-card-header">
            <span>我的班级</span>
            <div>
            <el-button type="primary" @click="addVisible = true" icon="el-icon-plus">添加</el-button>
            </div>
          </div>
        </template>
        <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
      v-loading="loading"
      border
      >
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="dormitory"
        label="宿舍"
      >
      </el-table-column>
      <el-table-column
        prop="totalscore"
        label="上次测验分数"
      >
      </el-table-column>
      <el-table-column
        label="相关操作"
      >
      <template #default="scope">
        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange" 
    />
      </el-card>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" v-model="editVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="宿舍">
                <el-input v-model="form.dormitory"></el-input>
            </el-form-item>
            <el-form-item label="分数">
              <el-input v-model="form.totalscore"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加弹出框 -->
    <el-dialog title="添加插班生" v-model="addVisible" width="30%">
      <el-form label-width="70px">
          <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="宿舍">
              <el-input v-model="form.dormitory"></el-input>
          </el-form-item>
          <el-form-item label="分数">
            <el-input v-model="form.totalscore"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="addStudent">确 定</el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script>
import { reactive,toRefs,ref,onMounted } from 'vue'
import axios from '../utils/axios.js'
import { ElMessage,ElMessageBox } from 'element-plus'

export default {
    setup() {
        const state =reactive({
            tableData: [],
            pageSize: 10,
            total: 0,
            currentPage: 1,
            loading: false,
            switchOn: true,
        })
        //弹出框👇
        const editVisible = ref(false);
        const addVisible = ref(false);
        let form = reactive({
            name: "",
            dormitory: "",
            totalscore:""
        });
        let idx = -1;
        const addStudent = () => {
          state.tableData.push(form);
          ElMessage.success(` ${state.tableData[state.tableData.length-1].name} 插班成功`);
          addVisible.value = false
        }
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                state.tableData[idx][item] = form[item];
            });
        };
        //弹出框👆
        const handleCurrentChange = (cpage) => {
            state.currentPage = cpage
        }
        const handleSizeChange = (psize) => {
            state.pageSize = psize
        }
        const handleDelete = (index) => {
          ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
                confirmButtonText: '确定',
                cancelButtonText: '再想想',
            }).then(() => {
            ElMessage.success(`删除成功`)
            state.tableData.splice(index,1)
              }
            ).catch(() => {})
        }
        const loadScope = () => {
            state.loading = true
            axios.get(`/classData`)
            .then((res) => {
                state.tableData = res.tableData;
                state.pageSize = res.pageSize;
                state.total = res.total;
                state.loading = false
            }).catch((e) => {
                console.log(e)
            })
        }
        onMounted(() => {
          loadScope()
        })
        return {
            ...toRefs(state),
            loadScope,
            form,
            editVisible,
            addVisible,
            saveEdit,
            addStudent,
            handleEdit,
            handleCurrentChange,
            handleSizeChange,
            handleDelete
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