import useMessage from '@/hooks/useMessage'
import { debounce } from 'lodash-es'

export const handleError = debounce((error: any) => {
  const { response } = error || {}
  const { createMessage } = useMessage()
  if (response && response.status) {
    switch (response.status) {
      case 401:
        createMessage.error('用户没有权限（令牌、用户名、密码错误）!')
        break
      case 403:
        createMessage.error('用户得到授权，但是访问是被禁止的。!')
        break
      case 404:
        createMessage.error('网络请求错误,未找到该资源!')
        break
      case 405:
        createMessage.error('网络请求错误,请求方法未允许!')
        break
      case 408:
        createMessage.error('网络请求超时!')
        break
      case 429:
        createMessage.error('网络请求次数过多!')
        break
      case 500:
        createMessage.error('服务器错误,请联系管理员!')
        break
      case 501:
        createMessage.error('网络未实现!')
        break
      case 502:
        createMessage.error('网络错误!')
        break
      case 503:
        createMessage.error('服务不可用，服务器暂时过载或维护!')
        break
      case 504:
        createMessage.error('网络超时!')
        break
      case 505:
        createMessage.error('http版本不支持该请求!')
        break
      default:
        createMessage.error('网络未知错误')
    }
  }
}, 1000)
