import { IPaging } from './common'

// -------------------------------------- 人员信息统计 -----------------------------------------------
/**
 * @description: 获取人员统计信息
 */
export interface IGetOverviewInfo {
  type: string
  bidCode: string
  startTime?: string
  endTime?: string
}

// -------------------------------------- 人员信息管理 -----------------------------------------------

/**
 * @description: 获取人员列表
 */
export interface IGetStaffList extends IPaging {
  bidCode: string
  name: string
  unitId: string
  unitType: string
  other?: string
}

/**
 * @desc 获取人员详情
 */
export interface IGetStaffDetail {
  id: string
  bidCode: string
}

/**
 * @desc 新增人员详情
 */
export interface IAddStaffInfo {
  userName: string
  identity: string
  gender: string
  nation: string
  userTypeId: string
  bidCode: string
  departTypeId: string
  postId: string
  unitId: string
  idcard: string
  phoneNumber: string
  passFlag: string
}

/**
 * @desc 更新人员详情
 */
export interface IUpdateStaffInfo {
  idcard: string
  phoneNumber: string
  passFlag: string
  id: string
}

// -------------------------------------- 人员进出管理 -----------------------------------------------

/**
 * @desc 人员进出管理列表
 */
export interface IGetStaffInAndOutList extends IPaging {
  bidCode: string
  departTypeId: string
  userName: string
}

// -------------------------------------- 关键人员离岗 -----------------------------------------------

/**
 * @desc 人员进出管理列表
 */
export interface IGetKeyStaffDepartList extends IPaging {
  bidCode: string
  departTypeId: string
  userName: string
  startTime: string
  endTime: string
  postId: string
}

// -------------------------------------- 特殊人员管理 -----------------------------------------------

/**
 * @desc 新增特殊人员
 */
export interface IAddTemporaryStaff {
  bidCode: string
  identity: string
  name: string
}

// -------------------------------------- 岗位维护 -----------------------------------------------

/**
 * @desc 获取岗位维护列表
 */
export interface IGetPostInfoList extends IPaging {
  label: string
}

/**
 * @desc 设置/取消关键岗位
 */
export interface ISetKeyPost {
  flag: string
  id: number
}

// -------------------------------------- LED管理 -----------------------------------------------

/**
 * @desc 保存led屏内容
 */
export interface ISaveLedInfo {
  person: string
  recovery: string
  work: string
}

/**
 * @desc 获取LED历史记录
 */
export type ISaveLedInfoIGetLedHistoryList = IPaging
