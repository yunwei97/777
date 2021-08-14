export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      return value
    }
  }
  
  export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  export function localRemove (key) {
    window.localStorage.removeItem(key)
  }

  export const pathMap = {
    Home:'主页',
    Login: '登录',
    Charts: '图表',
    Swiper: '轮播图',
    Table1: '个人信息',
    Table2: '年级排名',
    Table3: '地图定位',
    Table4: '班级管理',
    Account: '注销账户'
  }