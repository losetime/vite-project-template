import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions } from './types'
import axios from 'axios'
import { AxiosTransform } from './abstracts'
import { handleNetworkStatus, handleBusinessStatus } from './handleStatus'
import { RequestEnum, ResultEnum, Prefix, ErrorResult } from '@/enums/httpEnum'
import { isString, debounce } from 'lodash-es'
import useMessage from '@/hooks/useMessage'
import { downloadFiles } from '@/utils/base'
import {
  getToken,
  getClientPublicKey,
  generateSecretKey,
  generateSignature,
  privateKeyDecrypt,
  encryptRequestParams,
  getEncryptEnable,
} from '@/utils/auth'

/**
 * @description: 数据处理，方便区分多种处理方式（请求加密版本）
 */
export const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    const encryptEnable = getEncryptEnable()
    const { apiUrl, joinPrefix } = options
    // 拼接接口中间变量
    if (joinPrefix) {
      config.url = `${Prefix}${config.url}`
    }
    // 重新设置请求基础接口
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    // 判断请求类型
    if (config.method === RequestEnum.GET) {
      if (encryptEnable) {
        // 把参数暂存一下，加密【Cvit-Digest】还需要用原参数，会在用完之后清除掉
        config.data = config.params
        const encryptParams = encryptRequestParams(config.method, config.params)
        if (encryptParams) {
          config.params = {
            encryptedParams: encryptParams,
          }
        }
      } else {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: config.params || {},
        }
      }
    } else {
      // 说明是上传
      if (config.data) {
        return config
      }
      // 普通post请求
      else {
        if (encryptEnable) {
          config.data = encryptRequestParams(config.method, config.params)
        } else {
          config.data = config.params
          config.params = {}
        }
      }
    }
    console.log('处理config', config)
    return config
  },

  /**
   * @description: 请求拦截处理
   */
  requestInterceptors: (config: AxiosRequestConfig) => {
    const encryptEnable = getEncryptEnable()
    const token = getToken()
    const publicKey = getClientPublicKey()
    const secretKey = generateSecretKey()
    if (encryptEnable && config.headers) {
      // 请求之前处理config
      if (token) {
        // jwt token
        config.headers.Authorization = `Bearer ${token}`
      }
      if (publicKey) {
        config.headers['Cvit-Public-Key'] = publicKey
      }
      if (secretKey) {
        config.headers['Cvit-Secret-Key'] = secretKey
      }
      let reqParams = null
      if (config.method === 'get' && config.data) {
        reqParams = JSON.parse(JSON.stringify(config.data))
        config.data = null
      }
      if (config.method === 'post' && config.params) {
        reqParams = JSON.parse(JSON.stringify(config.params))
        config.params = {}
      }
      config.headers['Cvit-Digest'] = generateSignature(config.method, reqParams)
    } else {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    console.log(config)
    return config
  },

  /**
   * @description: 响应拦截处理
   */
  responseInterceptors: (res): AxiosResponse<any> | any => {
    const headerSecretKey = res.headers['cvit-secret-key']
    if (headerSecretKey) {
      // 解密响应结果
      const decryptResult = privateKeyDecrypt(headerSecretKey, res.data)
      // 替换data响应结果为解密后的对象
      res = { ...res, data: decryptResult }
    }
    const { code, msg } = res.data
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res)
    } else if (res.config.responseType === 'blob') {
      return Promise.resolve(res)
    } else {
      handleBusinessStatus(code, msg)
      return Promise.resolve(res)
    }
  },

  /**
   * @description: 处理响应成功的数据
   */
  transformRequestData: (res: any, options: RequestOptions) => {
    const { isTransformRequestResult } = options
    // 请求错误
    if (res === ErrorResult) {
      return res
    } else {
      if (isTransformRequestResult) {
        return res.data.data
      }
      // 下载文件，直接返回所有信息
      else if (res.config.responseType === 'blob') {
        downloadFiles(res)
        return Promise.resolve(res)
      }
      // 过滤第一层，返回{code,data,message}
      else {
        return res.data
      }
    }
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { createMessage } = useMessage()
    const { response, code, message } = error || {}
    // 是否是被取消的请求
    if (axios.isCancel(error)) {
      console.warn('请求被取消：', error)
      return Promise.resolve(ErrorResult)
    }
    const msg: string = response && response.data && response.data.error ? response.data.error.message : ''
    const err: string = error.toString()
    console.warn('请求错误', msg, err)
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        createMessage.error('接口请求超时,请刷新页面重试!')
        return Promise.resolve(ErrorResult)
      }
      if (err && err.includes('Network Error')) {
        createMessage.error('网络异常，请稍后重试')
        return Promise.resolve(ErrorResult)
      }
    } catch (error: any) {
      throw new Error(error)
    }
    debounce(() => {
      handleNetworkStatus(error.response && error.response.status, msg)
    }, 1000)
    return Promise.resolve(ErrorResult)
  },
}
