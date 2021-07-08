<template>
<el-dialog
  title="提示"
  v-model="dialogVisible"
  width="80%"
>
<el-table
:data="tableData"
style="width: 100%">
<el-table-column
  prop="time"
  label="">
</el-table-column>
<el-table-column
  prop="monday"
  label="星期一">
</el-table-column>
<el-table-column
  prop="tuesday"
  label="星期二">
</el-table-column>
<el-table-column
  prop="wednesday"
  label="星期三">
</el-table-column>
<el-table-column
  prop="thursday"
  label="星期四">
</el-table-column>
<el-table-column
  prop="friday"
  label="星期五">
</el-table-column>
<el-table-column
  prop="saturday"
  label="星期六">
</el-table-column>
<el-table-column
  prop="sunday"
  label="星期日">
</el-table-column>
</el-table>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </template>
</el-dialog>
</template>

<script>
import { reactive,toRefs,onMounted } from 'vue'
import axios from '../utils/axios'

export default {
    name: 'TianAn',
    setup () {
        const state = reactive({
            dialogVisible: false,
            tableData:[]
        })
        const open = () => {
            state.dialogVisible = true
        }
        const loadTable = () => {
          axios.get('/courseTable')
          .then((res) => {
            state.tableData = res.table
          })
        }
        onMounted(() => {
          loadTable()
        })
        return {
            ...toRefs(state),
            open
        }
    }
}
</script>