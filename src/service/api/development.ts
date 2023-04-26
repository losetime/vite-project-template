import { $http } from '../http'

import {
  GetOverviewInfoInterface,
  GetAbnormalTaskListInterface,
  AddModelScriptInfoInterface,
  UpdateModelScriptInfoInterface,
  ReleaseModelScriptInterface,
  RenameNodeNameInterface,
  RunModelScriptInterface,
  GetResourceTableListInterface,
  GetFlowListInterface,
  SaveFlowNodeInterface,
  SaveGlobalFlowInterface,
  QueryFlowExecutingStateInterface,
  GetNodeExecutingLogInterface,
  GetDevelopmentListInterface,
  SaveDevelopmentInfoInterface,
  ChangeDevelopmentStatusInterface,
  GetTaskMonitorListInterface,
  GetMonitorLogInfoInterface,
  IGetFlowNodesList,
  IDownloadLogs,
} from '../types/development'

enum Api {
  getOverviewInfo = 'http://192.168.35.211:1999/development/devHome/getData',
  getAbnormalTaskList = 'development/devHome/recentSevenDayFailedScriptExecRecord',

  getModelTreeList = 'http://192.168.35.211:1999/development/dev/ddevscript/getNodeTreeList',
  getResourceTreeList = 'http://192.168.35.211:1999/development/dev/ddevscript/listDbTableTree',
  getModelScriptInfo = 'http://192.168.35.211:1999/development/dev/ddevscript/getScriptContent',
  getModelTypeList = 'http://192.168.35.211:1999/development/dev/ddevscript/getSupportedFileTypes',
  addModelScriptInfo = 'http://192.168.35.211:1999/development/dev/ddevscript/save',
  updateModelScriptInfo = 'http://192.168.35.211:1999/development/dev/ddevscript/update',
  releaseModelScript = 'http://192.168.35.211:1999/development/dev/ddevscript/saveReleaseScript',
  withdrawModelScript = 'http://192.168.35.211:1999/development/dev/ddevscript/saveReleaseScript',
  delModelScriptInfo = 'http://192.168.35.211:1999/development/dev/ddevscript/delete',
  renameNodeName = 'http://192.168.35.211:1999/development/dev/ddevscript/saveRenameScript',
  runModelScript = 'http://192.168.35.211:1999/development/dev/ddevscript/executeOnceJob',
  stopModelScript = 'http://192.168.35.211:1999/development/dev/ddevscript/interruptJob',
  getResourceTableList = 'http://192.168.35.211:1999/development/dev/ddevscript/getTableData',

  getFlowList = 'http://192.168.35.211:1999/development/dev/ddevflow/selectPage',
  deleteFlow = 'http://192.168.35.211:1999/development/dev/ddevflow/delete',
  addFlowName = 'http://192.168.35.211:1999/development/dev/ddevflow/add',
  updateFlowName = 'http://192.168.35.211:1999/development/dev/ddevflow/rename',
  triggerRelease = 'http://192.168.35.211:1999/development/dev/ddevflow/release',
  saveFlowNode = 'http://192.168.35.211:1999/development/dev/ddevflow/saveFlowNode',
  delFlowNode = 'http://192.168.35.211:1999/development/dev/ddevflow/deleteFlowNode',
  getFlowInfo = 'http://192.168.35.211:1999/development/dev/ddevflow/getFlowDetail',
  saveGlobalFlow = 'http://192.168.35.211:1999/development/dev/ddevflow/saveFlowNodes',
  executionFlow = 'http://192.168.35.211:1999/development/dev/ddevflow/execFlow',
  stopFlowExecuting = 'http://192.168.35.211:1999/development/dev/ddevflow/interruptFlow',
  queryFlowExecutingState = 'http://192.168.35.211:1999/development/dev/ddevflow/getFlowExecState',
  getNodeExecutingLog = 'http://192.168.35.211:1999/development/dev/ddevflow/getNodeLog',
  downloadNodeLog = 'http://192.168.35.211:1999/development/dev/ddevflow/downloadNodeLog',
  getScheduleFlow = 'http://192.168.35.211:1999/development/dev/ddevflow/listWithBeScheduledFlag',

  getDevelopmentList = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/selectPage',
  delDevelopmentList = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/delete',
  addDevelopmentInfo = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/save',
  updateDevelopmentInfo = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/update',
  changeDevelopmentStatus = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/executeCron',
  getDevelopmentDataModel = 'http://192.168.35.211:1999/development/dev/ddevjobconfig/getResourceTree',

  getTaskMonitorList = 'http://192.168.35.211:1999/development/dev/ddevjobmonitor/selectPage',
  getMonitorLogInfo = 'http://192.168.35.211:1999/development/dev/ddevscript/getJobLog',
  getFlowNodesList = 'http://192.168.35.211:1999/development/dev/ddevjobmonitor/listFlowNode',
  downloadLogs = 'http://192.168.35.211:1999/development/dev/ddevjobmonitor/downloadJobLog',
}

// -------------------------------------- 模型概况 -----------------------------------------------

/**
 * @desc: 获取模型概况统计和图表数据
 */
export function apiGetOverviewInfo(params: GetOverviewInfoInterface) {
  return $http.request({
    url: Api.getOverviewInfo,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc 获取模型运行异常表格数据
 */
export function apiGetAbnormalTaskList(params: GetAbnormalTaskListInterface) {
  return $http.request({
    url: Api.getAbnormalTaskList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 模型开发 -----------------------------------------------

/**
 * @desc: 获取模型树列表
 */
export function apiGetModelTreeList(params?: { nodeName: string }) {
  return $http.request({
    url: Api.getModelTreeList,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取资源树列表
 */
export function apiGetResourceTreeList() {
  return $http.request({
    url: Api.getResourceTreeList,
    method: 'GET',
  })
}

/**
 * @desc: 获取模型脚本信息
 */
export function apiGetModelScriptInfo(params: { id: number }) {
  return $http.request({
    url: Api.getModelScriptInfo,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取模型脚本类型
 */
export function apiGetModelTypeList() {
  return $http.request({
    url: Api.getModelTypeList,
    method: 'GET',
  })
}

/**
 * @desc: 更新模型脚本信息
 */
export function apiAddModelScriptInfo(params: AddModelScriptInfoInterface) {
  return $http.request({
    url: Api.addModelScriptInfo,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 更新模型脚本信息
 */
export function apiUpdateModelScriptInfo(params: UpdateModelScriptInfoInterface) {
  return $http.request({
    url: Api.updateModelScriptInfo,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 发布脚本
 */
export function apiReleaseModelScript(params: ReleaseModelScriptInterface) {
  return $http.request({
    url: Api.releaseModelScript,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 撤回脚本
 */
export function apiWithdrawModelScript(params: ReleaseModelScriptInterface) {
  return $http.request({
    url: Api.withdrawModelScript,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 重命名节点名称
 */
export function apiRenameNodeName(params: RenameNodeNameInterface) {
  return $http.request({
    url: Api.renameNodeName,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 删除节点信息
 */
export function apiDelModelScriptInfo(params: number) {
  return $http.request({
    url: Api.delModelScriptInfo,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 执行脚本
 */
export function apiRunModelScript(params: RunModelScriptInterface) {
  return $http.request({
    url: Api.runModelScript,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 停止脚本执行
 */
export function apiStopModelScript(params: { jobId: string }) {
  return $http.request({
    url: Api.stopModelScript,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 停止脚本执行
 */
export function apiGetResourceTableList(params: GetResourceTableListInterface) {
  return $http.request({
    url: Api.getResourceTableList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 流程中心 -----------------------------------------------

/**
 * @desc 获取流程列表
 */
export function apiGetFlowList(params: GetFlowListInterface) {
  return $http.request({
    url: Api.getFlowList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除流程
 */
export function apiDeleteFlow(params: { flowName: string }) {
  return $http.request({
    url: Api.deleteFlow,
    method: 'POST',
    params,
  })
}

/**
 * @desc 新增流程名称
 */
export function apiAddFlowName(params: { flowName: string }) {
  return $http.request({
    url: Api.addFlowName,
    method: 'POST',
    params,
  })
}

/**
 * @desc 更新流程名称
 */
export function apiUpdateFlowName(params: { id: number; flowName: string }) {
  return $http.request({
    url: Api.updateFlowName,
    method: 'POST',
    params,
  })
}

/**
 * @desc 发布流程
 */
export function apiTriggerRelease(params: { id: number; status: string }) {
  return $http.request({
    url: Api.triggerRelease,
    method: 'POST',
    params,
  })
}

/**
 * @desc 获取流程信息
 */
export function apiGetFlowInfo(params: { id: number }) {
  return $http.request({
    url: Api.getFlowInfo + `/${params.id}`,
    method: 'GET',
  })
}

/**
 * @desc 新增/更新单个节点
 */
export function apiSaveFlowNode(params: SaveFlowNodeInterface) {
  return $http.request({
    url: Api.saveFlowNode,
    method: 'POST',
    params,
  })
}

/**
 * @desc 删除节点
 */
export function apiDelFlowNode(params: { id: number }): Promise<any> {
  return $http.request({
    url: Api.delFlowNode + `/${params.id}`,
    method: 'DELETE',
  })
}

/**
 * @desc 保存全局流程
 */
export function apiSaveGlobalFlow(params: SaveGlobalFlowInterface) {
  return $http.request({
    url: Api.saveGlobalFlow,
    method: 'POST',
    params,
  })
}

/**
 * @desc 执行流程
 */
export function apiExecutionFlow(params: SaveGlobalFlowInterface) {
  return $http.request({
    url: Api.executionFlow,
    method: 'POST',
    params,
  })
}

/**
 * @desc 终止流程
 */
export function apiStopFlowExecuting(params: { flowId: string }) {
  return $http.request({
    url: Api.stopFlowExecuting + `/${params.flowId}`,
    method: 'POST',
  })
}

/**
 * @desc 查询流程执行状态
 */
export function apiQueryFlowExecutingState(params: QueryFlowExecutingStateInterface) {
  return $http.request({
    url: Api.queryFlowExecutingState,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取节点日志
 */
export function apiGetNodeExecutingLog(params: GetNodeExecutingLogInterface) {
  return $http.request({
    url: Api.getNodeExecutingLog,
    method: 'GET',
    params,
  })
}

/**
 * @desc 下载节点日志
 */
export function apiDownloadNodeLog(params: GetNodeExecutingLogInterface) {
  return $http.request({
    url: Api.downloadNodeLog,
    method: 'GET',
    params,
    responseType: 'blob',
  })
}

// -------------------------------------- 任务调度 -----------------------------------------------

/**
 * @desc: 获取任务调度列表
 */
export function apiGetDevelopmentList(params: GetDevelopmentListInterface) {
  return $http.request({
    url: Api.getDevelopmentList,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 删除任务调度列表
 */
export function apiDelDevelopmentList(params: Array<number>) {
  return $http.request({
    url: Api.delDevelopmentList,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 修改任务调度状态
 */
export function apiChangeDevelopmentStatus(params: ChangeDevelopmentStatusInterface) {
  return $http.request({
    url: Api.changeDevelopmentStatus,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 获取任务调度数据模型选项
 */
export function apiGetDevelopmentDataModel(params?: { isPublished: boolean }) {
  return $http.request({
    url: Api.getDevelopmentDataModel,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取可被任务调度的流程
 */
export function apiGetScheduleFlow() {
  return $http.request({
    url: Api.getScheduleFlow,
    method: 'GET',
  })
}

/**
 * @desc: 添加任务调度
 */
export function apiAddDevelopmentInfo(params: SaveDevelopmentInfoInterface) {
  return $http.request({
    url: Api.addDevelopmentInfo,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 更新任务调度数据
 */
export function apiUpdateDevelopmentInfo(params: SaveDevelopmentInfoInterface) {
  return $http.request({
    url: Api.updateDevelopmentInfo,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 任务监控 -----------------------------------------------

/**
 * @desc: 获取任务监控列表
 */
export function apiGetTaskMonitorList(params: GetTaskMonitorListInterface) {
  return $http.request({
    url: Api.getTaskMonitorList,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取任务监控日志
 */
export function apiGetMonitorLogInfo(params: GetMonitorLogInfoInterface) {
  return $http.request({
    url: Api.getMonitorLogInfo,
    method: 'GET',
    params,
  })
}

/**
 * @desc 查询流程中子节点
 */
export function apiGetFlowNodesList(params: IGetFlowNodesList) {
  return $http.request({
    url: Api.getFlowNodesList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 下载日志
 */
export function apiDownloadLogs(params: IDownloadLogs) {
  return $http.request({
    url: Api.downloadLogs,
    method: 'GET',
    params,
    responseType: 'blob',
  })
}
