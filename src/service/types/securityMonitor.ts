import { IPaging } from './common'

/**
 * @desc 获取传感器列表
 */
export interface IGetSentorList extends IPaging {
  sensorType: string
  startDate: string
  endDate: string
}
