import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
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
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('@/views/TodoList.vue'),
  },
  {
    path: '/planner',
    name: 'planner',
    component: () => import('@/views/Planner.vue'),
  },
  {
    path: '/note',
    name: 'note',
    component: () => import('@/views/Note.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
