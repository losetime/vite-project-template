import { $http } from '../http/index'

// import { SubmitLoginInterface, IForceUpdatePassword } from '../types/login'

enum Api {
  getProjectType = '/person/improjectprogress/selectProjectType',
  getBDProjectProgress = '/person/improjectprogress/selectConstructionProgress',
  getXLProjectProgress = '/person/improjectprogress/selectConstructionProgressOfXl',
  updateBDProjectProgress = '/person/improjectprogress/update',
  updateXLProjectProgress = '/person/improjectprogress/updateProjectProgressXl',
  getProjectInfo = '/person/improjectsetup/detail',
  updateProjectInfo = '/person/improjectsetup/update',
  getLargeScreenConfigInfo = '/person/cvtouchscreenconfig/list',
  updateLargeScreenConfigInfo = '/person/cvtouchscreenconfig/batchSave',
  uploadImage = '/person/improjectimage/batchSave',
  getImageList = '/person/improjectimage/listAll',
}

// -------------------------------------- 工程进度 -----------------------------------------------

/**
 * @desc: 获取项目类型
 */
export function apiGetProjectType(): Promise<any> {
  return $http.request({
    url: Api.getProjectType,
    method: 'GET',
  })
}

/**
 * @desc: 获取变电施工进度
 */
export function apiGetBDProjectProgress(params: { projectType: string }): Promise<any> {
  return $http.request({
    url: Api.getBDProjectProgress,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取线路施工进度
 */
export function apiGetXLProjectProgress(): Promise<any> {
  return $http.request({
    url: Api.getXLProjectProgress,
    method: 'GET',
  })
}

/**
 * @desc: 更新变电工程进度
 */
export function apiUpdateBDProjectProgress(params: any[]): Promise<any> {
  return $http.request({
    url: Api.updateBDProjectProgress,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 更新线路工程进度
 */
export function apiUpdateXLProjectProgress(params: any[]): Promise<any> {
  return $http.request({
    url: Api.updateXLProjectProgress,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 工程设置 -----------------------------------------------

/**
 * @desc: 获取工程详情
 */
export function apiGetProjectInfo(): Promise<any> {
  return $http.request({
    url: Api.getProjectInfo,
    method: 'GET',
  })
}

/**
 * @desc: 更新工程详情
 */
export function apiUpdateProjectInfo(params: { id: string; projectType: string; voltage: string }): Promise<any> {
  return $http.request({
    url: Api.updateProjectInfo,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 大屏配置 -----------------------------------------------

/**
 * @desc: 获取大屏配置信息
 */
export function apiGetLargeScreenConfigInfo(): Promise<any> {
  return $http.request({
    url: Api.getLargeScreenConfigInfo,
    method: 'GET',
  })
}

/**
 * @desc: 更新大屏配置信息
 */
export function apiUpdateLargeScreenConfigInfo(params: any[]): Promise<any> {
  return $http.request({
    url: Api.updateLargeScreenConfigInfo,
    method: 'POST',
    params,
  })
}

/**
 * @desc 上传图片
 */
export function apiUploadImage(params: any[]): Promise<any> {
  return $http.request({
    url: Api.uploadImage,
    method: 'POST',
    params,
  })
}

/**
 * @desc 获取全部图片
 */
export function apiGetImageList(): Promise<any> {
  return $http.request({
    url: Api.getImageList,
    method: 'GET',
  })
}
