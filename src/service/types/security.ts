import { IPaging } from './common'

// -------------------------------------- 告警列表 -----------------------------------------------

/**
 * @description: 获取告警统计
 */
export interface IGetOverviewInfo {
  bidCode: string
  type: string
  day: string
}

// -------------------------------------- 告警列表 -----------------------------------------------

/**
 * @description: 获取告警统计
 */
export interface IGetAlarmStatis {
  bidCode: string
  startTime: string
  endTime: string
}

/**
 * @desc 获取告警详情列表
 */
export interface IGetAlarmDetailList extends IPaging {
  bidCode: string
  startTime: string
  endTime: string
}

// -------------------------------------- 体征数据 -----------------------------------------------

/**
 * @description: 获取体征数据列表
 */
export interface IGetSignsDataList extends IPaging {
  bidCode: string
  day: string
}

/**
 * @desc 获取人员详情
 */
export interface IGetPeopleDetail {
  personIdentity: string
  day: string
}
