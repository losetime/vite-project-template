import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useRouter } from 'vue-router'
import useMessage from '@/hooks/useMessage'
import { handleError } from './handleError'
import { encipherRequestMiddleware, decryptResponseMiddleware } from '@/utils/encipherUtil'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  const axiosCanceler = new AxiosCanceler()
  const router = useRouter()
  const { createMessage } = useMessage()

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (config.headers) {
        // 设置token
        const appStore = useAppStoreWithOut()
        if (appStore.token) {
          config.headers.Authorization = `Bearer ${appStore.token}`
        }
        // 请求加密
        config = encipherRequestMiddleware(config)
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
      res = decryptResponseMiddleware(res)
      res.config && axiosCanceler.removePending(res.config)
      const { data }: { data: any } = res
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
      // 是否是被取消的请求
      if (axios.isCancel(error)) {
        console.warn('请求被取消：', error)
        return Promise.resolve()
      } else {
        handleError(error)
        return Promise.reject()
      }
    },
  )
}
