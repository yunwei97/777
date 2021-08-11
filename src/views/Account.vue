<template>
    <el-empty description="这里是注销界面"></el-empty>
</template>

<script>
import { ElNotification } from 'element-plus';
import { onMounted } from 'vue'

export default {
    setup() {
        onMounted(() => {
        ElNotification({
          title: '注销提醒',
          message: '点击此处以注销账户----------👆',
          offset: 20
        });
        })
    }
}
</script>