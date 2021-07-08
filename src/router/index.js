import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },
  {
    path: '/table_1',
    name: 'Table1',
    component: () => import(/* webpackChunkName: "table_1" */ '../views/Table1.vue')
  },
  {
    path: '/table_2',
    name: 'Table2',
    component: () => import(/* webpackChunkName: "table_1" */ '../views/Table2.vue')
  },
  {
    path: '/table_3',
    name: 'Table3',
    component: () => import(/* webpackChunkName: "table_1" */ '../views/Table3.vue')
  },
  {
    path: '/table_4',
    name: 'Table4',
    component: () => import(/* webpackChunkName: "table_1" */ '../views/Table4.vue')
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import(/* webpackChunkName: "charts" */ '../views/Charts.vue')
  },
  {
    path: '/swiper',
    name: 'Swiper',
    component: () => import(/* webpackChunkName: "swiper" */ '../views/Swiper.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
