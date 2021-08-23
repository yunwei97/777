<template>
  <div class="header">
    <div class="left">
      <i v-if="hasBack" class="el-icon-back" @click="back"></i>
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
        @show="ff"
      >
        <template #reference>
          <div class="author">
            <i class="el-icon-user-solid" />
            {{ userInfo && userInfo.nickName || '' }}
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ userInfo && userInfo.loginUserName || '' }}</p>
          <p>昵称：{{ userInfo && userInfo.nickName || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../utils/axios'
import { localRemove, pathMap } from '../utils/index.js'
export default {
  name: 'Header',
  setup() {
    const ff = () => {
      getUserInfo()
    }
    const router = useRouter()
    const state = reactive({
      name: '主页',
      userInfo: null,
      hasBack: false
    })
    onMounted(() => {
        getUserInfo()
    })
    const getUserInfo = async () => {
      const userInfo = await axios.get('/api/userinfo');
      state.userInfo = userInfo
    }
    const logout = () => {
        //此处本应该是axios.delete操作，但我暂时不懂后端该怎么写。。
        localRemove('token')
        window.location.reload()
    }
    const back = () => {
      router.back()
    }
    router.afterEach((to) => {
    //  const { id } = to.query
      state.name = pathMap[to.name]
    //  if (id && to.name == 'add') {
    //    state.name = '编辑商品'
    //  }
    //下面这条代码是动态添加返回键用的，暂时用不到所以先注释掉
    //state.hasBack = ['level2', 'level3', 'order_detail'].includes(to.name)
    })
    return {
      ...toRefs(state),
      logout,
      back,
      ff
    }
  }
}
</script>

<style scoped>
  .header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .el-icon-back {
    border: 1px solid #e9e9e9;
    padding: 4px;
    border-radius: 50px;
    margin-right: 10px;
  }
  .right > div > .icon{
    font-size: 18px;
    margin-right: 6px;
  }
  .author {
    margin-left: 10px;
    cursor: pointer;
  }
</style>
<style>
  .popper-user-box {
    background: url('../assets/callingName.jpg') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
  }
  .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>