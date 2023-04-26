import { $http } from '../http'

import { IGetOverviewInfo, IGetVehicleList, IAddVehicleInfo, IGetVehicleInAndOutList } from '../types/vehicle'

enum Api {
  getOverviewInfo = '/person/cea/car/getDashboard',

  getVehicleList = '/person/cea/car/selectPage',
  addVehicleInfo = '/person/cea/car/save',

  getVehicleInAndOutList = '/person/cea/carrecord/selectPage',
}

// -------------------------------------- 人员信息统计 -----------------------------------------------

/**
 * @description: 车辆信息统计
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

// -------------------------------------- 车辆信息管理 -----------------------------------------------

/**
 * @description: 获取车辆列表
 */
export function apiGetVehicleList(params: IGetVehicleList) {
  return $http.request({
    url: Api.getVehicleList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 新增车辆信息
 */
export function apiAddVehicleInfo(params: IAddVehicleInfo) {
  return $http.request({
    url: Api.addVehicleInfo,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取车辆进出列表
 */
export function apiGetVehicleInAndOutList(params: IGetVehicleInAndOutList) {
  return $http.request({
    url: Api.getVehicleInAndOutList,
    method: 'GET',
    params,
  })
}
