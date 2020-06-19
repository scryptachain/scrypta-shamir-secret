import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
