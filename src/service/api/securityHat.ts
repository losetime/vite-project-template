import { $http } from '../http'

import { IGetSnapshotRecord } from '../types/securityHat'
import { IPaging } from '../types/common'

enum Api {
  getSecurityHatLocation = '/person/safetyHat/allOnlineHatRealTimeLocation',
  convertCoords = 'https://restapi.amap.com/v3/assistant/coordinate/convert',
  getPlayerToken = '/person/safetyHat/loginInfo',
  getSnapshotRecord = '/person/safetyHat/captureRecordPage',
  getSecurityHatVideoList = '/person/safetyHat/allVideoHatOnlineStatus',
  getPeopleBindList = '/person/safetyHat/safetyHatPge',
  updatePeopleBind = '/person/safetyHat/bindPeople',
  getPeopleInfoList = '/person/cea/peopleinfo/fuzzyQueryPeoples',
}

// -------------------------------------- 安全帽总览 -----------------------------------------------

/**
 * @description: 获取在线安全帽位置
 */
export function apiGetSecurityHatLocation() {
  return $http.request({
    url: Api.getSecurityHatLocation,
    method: 'GET',
  })
}

/**
 * @description: 高德转换坐标
 */
export function apiConvertCoords(params: any) {
  return $http.request({
    url: Api.convertCoords,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 实时视频 -----------------------------------------------

/**
 * @description: 获取视频token
 */
export function apiGetPlayerToken() {
  return $http.request({
    url: Api.getPlayerToken,
    method: 'POST',
  })
}

/**
 * @description: 获取安全帽视频列表
 */
export function apiGetSecurityHatVideoList() {
  return $http.request({
    url: Api.getSecurityHatVideoList,
    method: 'GET',
  })
}

// -------------------------------------- 抓拍记录 -----------------------------------------------

/**
 * @description: 获取抓拍记录列表
 */
export function apiGetSnapshotRecord(params: IGetSnapshotRecord) {
  return $http.request({
    url: Api.getSnapshotRecord,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 人员绑定 -----------------------------------------------

/**
 * @description: 获取安全帽人员绑定列表
 */
export function apiGetPeopleBindList(params: IPaging) {
  return $http.request({
    url: Api.getPeopleBindList,
    method: 'GET',
    params,
  })
}

interface IUpdatePeopleBind {
  id: string
  deviceId: string
  type: string
  bindUserName: string
  bindIdentity: string
}

/**
 * @description: 编辑人员绑定
 */
export function apiUpdatePeopleBind(params: IUpdatePeopleBind) {
  return $http.request({
    url: Api.updatePeopleBind,
    method: 'POST',
    params,
  })
}

/**
 * @description: 查询人员列表
 */
export function apiGetPeopleInfoList(params: { userName: string }) {
  return $http.request({
    url: Api.getPeopleInfoList,
    method: 'GET',
    params,
  })
}
