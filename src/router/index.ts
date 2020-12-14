import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:path(.*)*',
    name: 'home',
    component: defineAsyncComponent(() => import('../views/home/index')),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
