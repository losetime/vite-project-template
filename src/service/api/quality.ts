import { $http } from '../http'

enum Api {
  getTransferTestList = '/person/quality/commissioningTestRecords',
  getBluetoothList = '/person/quality/bluetoothQualityAcceptanceRecords',
}

// -------------------------------------- 交接实验 -----------------------------------------------

/**
 * @description: 获取交接试验列表
 */
export function apiGetTransferTestList() {
  return $http.request({
    url: Api.getTransferTestList,
    method: 'GET',
  })
}

// -------------------------------------- 蓝牙设备 -----------------------------------------------

/**
 * @description: 获取交接试验列表
 */
export function apiGetBluetoothList() {
  return $http.request({
    url: Api.getBluetoothList,
    method: 'GET',
  })
}
