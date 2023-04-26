import { IPaging } from './common'

// -------------------------------------- 人员信息统计 -----------------------------------------------

/**
 * @description: 获取人员培训列表
 */
export interface IGetPersonList extends IPaging {
  userType?: string
  departName?: string
  unitName?: string
}

export interface IGetTrainRecordList extends IPaging {
  userType?: string
  departName?: string
  userName?: string
}
