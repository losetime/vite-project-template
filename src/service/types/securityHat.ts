import { IPaging } from './common'

// -------------------------------------- 告警列表 -----------------------------------------------

/**
 * @description: 获取抓拍记录列表
 */
export interface IGetSnapshotRecord extends IPaging {
  deviceId: string
}
