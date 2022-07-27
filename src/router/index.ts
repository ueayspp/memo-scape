import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { authGuard } from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/components/Signup.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('@/views/Diary.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('@/views/TodoList.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/planner',
    name: 'planner',
    component: () => import('@/views/Planner.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/note',
    name: 'note',
    component: () => import('@/views/Note.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
