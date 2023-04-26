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

// -------------------------------------- 车辆信息管理 -----------------------------------------------

/**
 * @description: 获取车辆列表
 */
export interface IGetVehicleList extends IPaging {
  bidCode: string
  carGenreId: string
  carNo: string
  carTypeId: string
}

/**
 * @desc 新增车辆信息
 */
export interface IAddVehicleInfo {
  bidNo: string
  carCardTypeId: string
  carGenreId: string
  carNo: string
  carTypeId: string
  contractName: string
  identity: string
  name: string
  phone: string
  reason: string
  unitId: string
}

/**
 * @desc 车辆进出列表
 */
export interface IGetVehicleInAndOutList extends IPaging {
  bidCode: string
  carCardTypeId: string
  carNo: string
  other?: string
}
