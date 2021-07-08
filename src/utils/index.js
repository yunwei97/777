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
    Table1: '表格1',
    Table2: '表格2',
    Table3: '表格3',
    Table4: '表格4',
    Account: '修改账户'
  }