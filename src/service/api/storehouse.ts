import { $http } from '../http'

import {
  IGetRepositoryList,
  ISaveRepository,
  ISaveFreightSpace,
  IGetTagsList,
  ISaveTag,
  IGenerateFRID,
  IGetToolsReceiveList,
  IGetToolShippingSpaceRecord,
  IGetVideoCollectRecord,
  IGetToolDetailRecord,
  IGetDashboardData,
} from '../types/storehouse'

// -------------------------------------- 首页 -----------------------------------------------

/**
 * @desc 获取仪表盘数据
 */
export function apiGetDashboardData(params: IGetDashboardData): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/getDashboard',
    method: 'GET',
    params,
  })
}

/**
 * @desc 工器具饼状图统计
 */
export function apiGetToolCount(params: { bidNo: string; dataType: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/visualization/pie',
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc 待办事项/已处理事项查询
 */
export function apiGetToolTodoRecord(params: { status: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tooltodo/selectAll',
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc 不再提醒
 */
export function apiHandleNotRemind(): Promise<any> {
  return $http.request({
    url: '/person/cea/tooltodo/noMoreNotice',
    method: 'POST',
  })
}

/**
 * @desc 处理待办事项
 */
export function apiHandleTodoDone(params: { id: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tooltodo/deal',
    method: 'POST',
    params,
  })
}

// -------------------------------------- 标签写入 -----------------------------------------------

/**
 * @description: 获取标签列表
 */
export function apiGetTagsList(params: IGetTagsList): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/selectPage',
    method: 'GET',
    params,
  })
}

/**
 * @description: 新增/更新标签
 */
export function apiSaveTag(params: ISaveTag): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/saveTool',
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 生成FRID
 */
export function apiGenerateFRID(params: IGenerateFRID): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/genRfidCode',
    method: 'GET',
    params,
  })
}

/**
 * @desc: 删除标签
 */
export function apiDeleteTags(params: { ids: string[] }): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/delete',
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 领还记录 -----------------------------------------------

/**
 * @desc 领还记录列表
 */

export function apiGetToolsReceiveList(params: IGetToolsReceiveList): Promise<any> {
  return $http.request({
    url: '/person/cea/toolrecipient/selectPage',
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取工器具详情
 */
export function apiGetToolDetail(params: { id: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/getDetail',
    method: 'GET',
    params,
  })
}

// -------------------------------------- 检验周期 -----------------------------------------------

/**
 * @desc 更新工器具详情
 */
export function apiUpdateToolDetail(params: any): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/update',
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 信息维护 -----------------------------------------------

/**
 * @description: 仓库管理-获取仓库列表
 */
export function apiGetRepositoryList(params: IGetRepositoryList): Promise<any> {
  return $http.request({
    url: '/person/cea/storehouse/selectPage',
    method: 'GET',
    params,
  })
}

/**
 * @description: 仓库管理-新增/更新仓库
 */
export function apiSaveRepository(params: ISaveRepository): Promise<any> {
  return $http.request({
    url: '/person/cea/storehouse/save',
    method: 'POST',
    data: params,
  })
}

/**
 * @description: 仓库管理-删除仓库
 */
export function apiDeleteRepository(params: { ids: string[] }): Promise<any> {
  return $http.request({
    url: '/person/cea/storehouse/delete',
    method: 'POST',
    data: params,
  })
}

/**
 * @description: 仓位管理-获取所有仓库
 */
export function apiGetRepositoryAll(): Promise<any> {
  return $http.request({
    url: '/person/cea/storehouse/selectAll',
    method: 'GET',
  })
}

/**
 * @description: 仓位管理-获取仓位列表
 */
export function apiGetFreightSpaceList(params: { name: string; houseId?: string; bidCode?: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/storeposition/selectPage',
    method: 'GET',
    params,
  })
}

/**
 * @desc 仓位管理-获取工器具树结构
 */
export function apiGetToolsTree(): Promise<any> {
  return $http.request({
    url: '/person/cea/tooltype/getTree',
    method: 'GET',
  })
}

/**
 * @description: 仓位管理-新增/更新仓位
 */
export function apiSaveFreightSpace(params: ISaveFreightSpace): Promise<any> {
  return $http.request({
    url: '/person/cea/storeposition/save',
    method: 'POST',
    data: params,
  })
}

/**
 * @description: 仓位管理-删除仓位
 */
export function apiDeleteFreightSpace(params: { ids: string[] }): Promise<any> {
  return $http.request({
    url: '/person/cea/storeposition/delete',
    method: 'POST',
    data: params,
  })
}

/**
 * @description: 工器具名称/型号-获取标签列表
 * @param other 工器具名称/型号toolType 库存预警stockWarn 盘点入库清单stockList 应领工器具列表shouldTakeList
 */
export function apiGetToolTypeList(params: IGetTagsList): Promise<any> {
  return $http.request({
    url: '/person/cea/tooltype/selectPage',
    method: 'GET',
    params,
  })
}

// -------------------------------------- 可视化仓库状态 -----------------------------------------------

/**
 * @description: 获取仓位列表
 */
export function apiGetToolShippingSpaceRecord(params: IGetToolShippingSpaceRecord): Promise<any> {
  return $http.request({
    url: '/person/cea/storeposition/selectPage',
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取仓位下的工器具列表
 */
export function apiGetShippingSpaceDetailRecord(params: { houseId: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/getListByPositionId',
    method: 'GET',
    params,
  })
}

// --------------------------------------- 视频采集管理 --------------------------------------------------

/**
 * @description: 获取视频分页
 */
export function apiGetVideoCollectRecord(params: IGetVideoCollectRecord): Promise<any> {
  return $http.request({
    url: '/person/video/selectPage',
    method: 'GET',
    params,
  })
}

// --------------------------------------- 盘点入库管理 --------------------------------------------------

/**
 * @description: 获取工器具列表
 */
export function apiGetToolDetailRecord(params: IGetToolDetailRecord): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/getListByDict',
    method: 'GET',
    params,
  })
}

/**
 * @description: 一键入库
 */
export function apiPutInWarehousing(): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/stock',
    method: 'GET',
  })
}

/**
 * @desc 工器具清单上传
 */
export function apiUploadToolManifest(params: { file: File; toolTag: string }): Promise<any> {
  return $http.uploadFiles({
    url: '/person/cea/tool/importData',
    method: 'POST',
    data: params,
  })
}

// --------------------------------------- 重点工器具领用分析 --------------------------------------------------

/**
 * @description: 获取分析数据
 */
export function apiGetAnalysisStats(params?: { day: string }): Promise<any> {
  return $http.request({
    url: '/person/cea/tool/getAnalysis',
    method: 'GET',
    params,
  })
}
