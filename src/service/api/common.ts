import { $http } from '../http'

enum Api {
  getRoutersInfo = '/usermanager/getRouters',
  getDicts = '/person/cea/sysdict/getDict',
  getDictChildren = '/person/cea/sysdict/getChildren',
  getProjectSection = '/person/cea/bid/getAllBid',
  getUserDicts = '/usermanager/system/dict/data/type',
  getPublicKey = '/person/api/security/rsa',
  getDroneToken = '/uav/getKitebeamIFrameToken',
  getMsgReminderNum = '/person/cea/tooltodo/msgNum',
  setMsgHaveRead = '/person/cea/tool/readMsg',
}

/**
 * @desc: 获取路由信息
 */
export function apiGetRoutersInfo(): Promise<any> {
  return $http.request({
    url: Api.getRoutersInfo,
    method: 'GET',
    headers: {
      ignoreCancelToken: true,
    },
  })
}

/**
 * @description: 获取后端字典
 */
export function apiGetDicts(params: { types: string }): Promise<any> {
  return $http.request({
    url: Api.getDicts,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @description: 获取后端联级字典
 */
export function apiGetDictChildren(params: { type: string; value: string }): Promise<any> {
  return $http.request({
    url: Api.getDictChildren,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @description: 获取用户管理字典
 */
export function apiGetUserDicts(params: { typeKey: string }): Promise<any> {
  return $http.request({
    url: Api.getUserDicts + `/${params.typeKey}`,
    method: 'GET',
  })
}

/**
 * @description: 获取所有标段
 */
export function apiGetProjectSection(params?: { bidName: string }): Promise<any> {
  return $http.request({
    url: Api.getProjectSection,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取RSA公钥和随机串
 */
export function apiGetPublicKey(): Promise<any> {
  return $http.request({
    url: Api.getPublicKey,
    method: 'GET',
  })
}

/**
 * @desc 获取无人机Token
 */
export function apiGetDroneToken() {
  return $http.request({
    url: Api.getDroneToken,
    method: 'GET',
  })
}

/**
 * @desc 获取未读消息数量
 */
export function apiGetMsgReminderNum(params: { dataType: string }): Promise<any> {
  return $http.request({
    url: Api.getMsgReminderNum,
    method: 'GET',
    params,
  })
}

/**
 * @desc 设置消息已读
 */
export function apiSetMsgHaveRead(params: { dataType: string }): Promise<any> {
  return $http.request({
    url: Api.setMsgHaveRead,
    method: 'GET',
    params,
  })
}
