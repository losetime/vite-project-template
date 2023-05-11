import type { AxiosInstance, AxiosResponse } from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useRouter } from 'vue-router'
import useMessage from '@/hooks/useMessage'
import { handleError } from './handleError'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  const axiosCanceler = new AxiosCanceler()
  const router = useRouter()
  const { createMessage } = useMessage()

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const appStore = useAppStoreWithOut()
      if (config.headers) {
        // 设置token
        if (appStore.token) {
          config.headers.Authorization = `Bearer ${appStore.token}`
        }
        // 设置取消请求
        if (!config.headers.ignoreCancelToken) {
          axiosCanceler.addPending(config)
        }
      }
      return config
    },
    (error: Error) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
      const { data, config }: { data: any; config: any } = res
      config && axiosCanceler.removePending(res.config)
      if (data.code !== 20000) {
        createMessage.error(data.msg)
      }
      if (data.code === 40001) {
        const appStore = useAppStoreWithOut()
        appStore.token = ''
        router.replace({ name: 'Login' })
      }
      return data
    },
    (error) => {
      handleError(error)
      return Promise.reject()
    },
  )
}
