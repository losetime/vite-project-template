import { $http } from '../http'

enum Api {
  getAlarmList = '',
  getAlarmConfigList = '',
}

// -------------------------------------- 告警中心 -----------------------------------------------

/**
 * @description: 获取短信告警列表
 */
export function apiGetAlarmList(): Promise<any> {
  return $http.request({
    url: Api.getAlarmList,
    method: 'GET',
  })
}

// -------------------------------------- 告警配置中心 -----------------------------------------------

/**
 * @description: 获取告警配置列表
 */
export function apiGetAlarmConfigList(): Promise<any> {
  return $http.request({
    url: Api.getAlarmConfigList,
    method: 'GET',
  })
}
