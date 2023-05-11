import { onBeforeMount, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useRouter } from 'vue-router'

const useCache = () => {
  const appStore = useAppStore()

  const router = useRouter()

  appStore.$subscribe((_mutation, state) => {
    sessionStorage.setItem('appStore', JSON.stringify(state))
  })

  watch(
    () => appStore.token,
    async (token: string) => {
      if (token) {
        await appStore.GetRoutersInfo()
        await appStore.GetUserInfo()
      } else {
        router.replace({ name: 'Login' })
      }
    },
  )

  onBeforeMount(() => {
    getAppStore()
  })

  const getAppStore = async () => {
    const appStoreCache = sessionStorage.getItem('appStore')
    if (appStoreCache) {
      appStore.$state = JSON.parse(appStoreCache)
    }
  }
}

export default useCache
