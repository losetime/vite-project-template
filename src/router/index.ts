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
router.beforeEach(async (to, _from, next) => {
  const appStore = useAppStore()
  const storeToken = appStore.userInfo.token
  const cacheAppStore = sessionStorage.getItem('appStore')
  const cacheUserInfo = cacheAppStore ? JSON.parse(cacheAppStore).userInfo : ''
  if (to.name === 'Login') {
    if (cacheUserInfo) {
      appStore.userInfo = cacheUserInfo
      await appStore.GetRoutersInfo()
      next()
    } else {
      sessionStorage.removeItem('appStore')
      next()
    }
  } else {
    if (cacheUserInfo) {
      if (storeToken) {
        next()
      } else {
        appStore.userInfo = cacheUserInfo
        await appStore.GetRoutersInfo()
        next({ path: to.path, query: to.query })
      }
    } else {
      sessionStorage.removeItem('appStore')
      next({ name: 'Login' })
    }
  }
})
