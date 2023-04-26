import { $http } from '../http'

import {
  IGetOverviewInfo,
  IGetStaffList,
  IGetStaffDetail,
  IAddStaffInfo,
  IUpdateStaffInfo,
  IGetStaffInAndOutList,
  IGetKeyStaffDepartList,
  IGetPostInfoList,
  IAddTemporaryStaff,
  ISetKeyPost,
  ISaveLedInfo,
} from '../types/staff'

import { IPaging } from '../types/common'

enum Api {
  getOverviewInfo = '/person/cea/peopleinfo/getDashboard',

  getStaffList = '/person/cea/peopleinfo/selectPage',
  getStaffDetail = '/person/cea/peopleinfo/getDetail',
  addStaffInfo = '/person/cea/peopleinfo/add',
  updataStaffInfo = '/person/cea/peopleinfo/update',
  delStaffInfo = '/person/cea/peopleinfo/delete',
  uploadFiles = '/person/cea/imageUpload/uploadImage',

  getStaffInAndOutList = '/person/cea/accessrecord/selectPage',

  getKeyStaffDutyList = '/person/cea/peopleinfo/getKeyPersonCareer',

  getKeyStaffDepartList = '/person/cea/accessrecord/keyPersonLeavePage',

  addTemporaryStaff = '/person/cea/peopleinfo/addTemp',

  getPostInfoList = '/person/cea/sysdict/getPost',
  setKeyPost = '/person/cea/sysdict/operateKeyPost',

  getLEDInfo = '/person/cea/ledcontent/getContentPerson',
  saveLedInfo = '/person/cea/ledcontent/save',
  getLedHistoryList = '/person/cea/ledcontent/selectPage',

  getGateList = '/person/basic/persongateconfig/list',
  addGateConfig = '/person/basic/persongateconfig/save',
  updateGateConfig = '/person/basic/persongateconfig/update',
  deleteGateConfig = '/person/basic/persongateconfig/delete',
}

// -------------------------------------- 人员信息统计 -----------------------------------------------

/**
 * @description: 人员信息统计
 */
export function apiGetOverviewInfo(params: IGetOverviewInfo) {
  return $http.request({
    url: Api.getOverviewInfo,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

// -------------------------------------- 人员信息管理 -----------------------------------------------

/**
 * @description: 获取人员信息列表
 */
export function apiGetStaffList(params: IGetStaffList) {
  return $http.request({
    url: Api.getStaffList,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @description: 获取人员信息详情
 */
export function apiGetStaffDetail(params: IGetStaffDetail) {
  return $http.request({
    url: Api.getStaffDetail,
    method: 'GET',
    params,
  })
}

/**
 * @description: 新增人员信息
 */
export function apiAddStaffInfo(params: IAddStaffInfo) {
  return $http.request({
    url: Api.addStaffInfo,
    method: 'POST',
    params,
  })
}

/**
 * @description: 更新人员信息
 */
export function apiUpdateStaffInfo(params: IUpdateStaffInfo) {
  return $http.request({
    url: Api.updataStaffInfo,
    method: 'POST',
    params,
  })
}

/**
 * @description: 删除人员信息
 */
export function apiDelStaffInfo(params: { ids: string[] }) {
  return $http.request({
    url: Api.delStaffInfo,
    method: 'POST',
    params,
  })
}

/**
 * @description: 上传图片
 */
export function apiUploadFile(params: Object) {
  return $http.uploadFiles(
    {
      url: Api.uploadFiles,
      method: 'POST',
      timeout: 50 * 1000,
    },
    params,
  )
}

// -------------------------------------- 人员进出管理 -----------------------------------------------

/**
 * @description: 人员进出管理列表
 */
export function apiGetStaffInAndOutList(params: IGetStaffInAndOutList) {
  return $http.request({
    url: Api.getStaffInAndOutList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 关键人员履职管理 -----------------------------------------------

/**
 * @description: 获取关键人员履职列表
 */
export function apiGetKeyStaffDutyList(params: IGetStaffList) {
  return $http.request({
    url: Api.getKeyStaffDutyList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 关键人员离岗管理 -----------------------------------------------

/**
 * @description: 获取关键人员离岗列表
 */
export function apiGetKeyStaffDepartList(params: IGetKeyStaffDepartList) {
  return $http.request({
    url: Api.getKeyStaffDepartList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 特殊(临时)人员管理 -----------------------------------------------

/**
 * @description: 新增临时人员
 */
export function apiAddTemporaryStaff(params: IAddTemporaryStaff) {
  return $http.request({
    url: Api.addTemporaryStaff,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 岗位信息管理 -----------------------------------------------

/**
 * @description: 获取岗位信息列表
 */
export function apiGetPostInfoList(params: IGetPostInfoList) {
  return $http.request({
    url: Api.getPostInfoList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 设置/取消关键岗位
 */
export function apiSetKeyPost(params: ISetKeyPost) {
  return $http.request({
    url: Api.setKeyPost,
    method: 'GET',
    params,
  })
}

// -------------------------------------- LED管理 -----------------------------------------------

/**
 * @description: 获取led屏内容【人员在场情况】
 */
export function apiGetLEDInfo() {
  return $http.request({
    url: Api.getLEDInfo,
    method: 'GET',
  })
}

/**
 * @description: 保存led屏内容
 */
export function apiSaveLedInfo(params: ISaveLedInfo) {
  return $http.request({
    url: Api.saveLedInfo,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取LED历史记录
 */
export function apiGetLedHistoryList(params: IPaging) {
  return $http.request({
    url: Api.getLedHistoryList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 闸机管理 -----------------------------------------------

/**
 * @description: 获取闸机列表
 */
export function apiGetGateList() {
  return $http.request({
    url: Api.getGateList,
    method: 'GET',
  })
}

/**
 * @description: 添加闸机配置
 */
export function apiAddGateConfig(params: any) {
  return $http.request({
    url: Api.addGateConfig,
    method: 'POST',
    params,
  })
}

/**
 * @description: 更新闸机配置
 */
export function apiUpdateGateConfig(params: any) {
  return $http.request({
    url: Api.updateGateConfig,
    method: 'POST',
    params,
  })
}

/**
 * @description: 删除闸机配置
 */
export function apiDeleteGateConfig(parmas: string) {
  return $http.request({
    url: Api.deleteGateConfig + '?id=' + parmas,
    method: 'DELETE',
  })
}
