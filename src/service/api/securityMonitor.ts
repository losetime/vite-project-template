import { $http } from '../http'

import { IGetSentorList } from '../types/securityMonitor'

enum Api {
  getSentorList = '/person/gtpullsensorrecord/selectPage',
  selectPullingList = '/person/gtpullsensorrecord/selectPullingList', //拉力数据
  selectPullingLineChart = '/person/gtpullsensorrecord/selectPullingLineChart', //拉力折线数据
  selectAngleList = '/person/gtanglesensorrecord/selectAngleList', //倾角数据
  selectAngleLineChart = '/person/gtanglesensorrecord/selectAngleLineChart', //倾角折线数据
}

// -------------------------------------- 传感器列表 -----------------------------------------------
/**
 * @description: 传感器列表
 */
export const apiGetSensorList = (params: IGetSentorList) => {
  return $http.request({
    url: Api.getSentorList,
    method: 'GET',
    params,
  })
}
//-----------------------------------------拉力 & 倾角--------------------------------------------
/**
 * @description:拉力数据
 */
export const selectPullingList = () => {
  return $http.request({
    url: Api.selectPullingList,
    method: 'GET',
  })
}
/**
 * @description:拉力折线数据
 */
export const selectPullingLineChart = () => {
  return $http.request({
    url: Api.selectPullingLineChart,
    method: 'GET',
  })
}
/**
 * @description:倾角折线数据
 */
export const selectAngleLineChart = () => {
  return $http.request({
    url: Api.selectAngleLineChart,
    method: 'GET',
  })
}
/**
 * @description:倾角数据
 */
export const selectAngleList = () => {
  return $http.request({
    url: Api.selectAngleList,
    method: 'GET',
  })
}
