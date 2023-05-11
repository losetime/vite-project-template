import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { setupInterceptors } from './setupInterceptors'

// 创建 axios 请求实例
export const serviceAxios: AxiosInstance = axios.create({
  baseURL: '', // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
})

setupInterceptors(serviceAxios)

export const $http = {
  request: (config: any) => {
    return serviceAxios(config)
  },
}
