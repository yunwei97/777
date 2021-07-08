import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import { localGet } from './index'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = "https://www.fastmock.site/mock/d499747d0e63b8a6c416120a3375b44c/test1"
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      ElMessage.error('服务端异常！')
      return Promise.reject(res)
    }
    if (res.data.data.resultCode != 666) {
      if (res.data.data.failedMessage) ElMessage.error(res.data.data.failedMessage)
      if (res.data.data.resultCode == 555) {
        router.push({ path: '/login' });
      }
      return Promise.reject(res.data)
    }
    //注意在mock上写要传的数据时要把它放在data.userInfo上
  return res.data.data.userInfo
})

export default axios