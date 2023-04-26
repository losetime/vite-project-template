import { $http } from '../http'

import {
  IGetOverviewInfo,
  IGetAlarmStatis,
  IGetAlarmDetailList,
  IGetSignsDataList,
  IGetPeopleDetail,
} from '../types/security'

enum Api {
  getOverviewInfo = '/safety/cea/dashboard/overview',
  exportReport = '/safety/cea/dashboard/downloadReport',

  getAlarmStatis = '/safety/cea/watchevent/statistics',
  getAlarmDetailList = '/safety/cea/watchevent/selectPage',

  getSignsDataList = '/safety/cea/watchdata/selectPage',
  getPeopleList = '/safety/cea/watchdata/getPeopleList',
  getPeopleDetail = '/safety/cea/watchdata/charts',
}

// -------------------------------------- 总览 -----------------------------------------------
/**
 * @description: 获取总览信息
 */
export function apiGetOverviewInfo(params: IGetOverviewInfo) {
  return $http.request({
    url: Api.getOverviewInfo,
    method: 'GET',
    params,
  })
}

/**
 * @desc 导出报告
 */
export function apiExportReport(params: { bidCode: string; day: string }) {
  return $http.request({
    url: Api.exportReport,
    method: 'GET',
    params,
    responseType: 'blob',
    onDownloadProgress: function (progressEvent: any) {
      console.log(progressEvent)
    },
  })
}

// -------------------------------------- 告警列表 -----------------------------------------------

/**
 * @description: 获取告警统计
 */
export function apiGetAlarmStatis(params: IGetAlarmStatis) {
  return $http.request({
    url: Api.getAlarmStatis,
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取告警详情列表
 */
export function apiGetAlarmDetailList(params: IGetAlarmDetailList) {
  return $http.request({
    url: Api.getAlarmDetailList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 体征数据 -----------------------------------------------

/**
 * @description: 获取体征数据列表
 */
export function apiGetSignsDataList(params: IGetSignsDataList) {
  return $http.request({
    url: Api.getSignsDataList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取体征数据人员列表
 */
export function apiGetPeopleList(params: { bidCode: string; day: string }) {
  return $http.request({
    url: Api.getPeopleList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取人员详情
 */
export function apiGetPeopleDetail(params: IGetPeopleDetail) {
  return $http.request({
    url: Api.getPeopleDetail,
    method: 'GET',
    params,
  })
}
