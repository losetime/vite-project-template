import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

/**
 * @desc 命名规范
 * path: '/personal-center',
 * name: PersonalCenter,
 * component: PersonalCenter
 */
const routes: any = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * @desc 路由守卫
 */
router.beforeEach((to, _from, next) => {
  const appStore = useAppStore()
  const storeToken = appStore.userInfo.token
  const cacheAppStore = sessionStorage.getItem('appStore')
  const cacheToken = cacheAppStore ? JSON.parse(cacheAppStore).userInfo.token : ''
  if (to.name === 'Login') {
    if (cacheToken) {
      appStore.userInfo.token = cacheToken
      appStore.GetRoutersInfo()
      appStore.GetUserInfo()
      next()
    } else {
      next()
    }
  } else {
    if (cacheToken) {
      if (storeToken) {
        next()
      } else {
        appStore.userInfo.token = cacheToken
        appStore.GetRoutersInfo()
        appStore.GetUserInfo()
      }
    } else {
      next({ name: 'Login' })
    }
  }
})
