import { IPaging } from './common'

// -------------------------------------- 模型概况 -----------------------------------------------

/**
 * @desc: 获取模型概况统计和图表数据
 */
export interface GetOverviewInfoInterface {
  type: number
}

/**
 * @desc: 获取异常任务表格数据
 */
export interface GetAbnormalTaskListInterface {
  current: number
  size: number
}

// -------------------------------------- 模型开发 -----------------------------------------------

/**
 * @desc: 新增模型信息
 */
export interface AddModelScriptInfoInterface {
  treeNodeType: string // 新增节点是文件夹还是脚本
  fileType: string // 脚本类型
  nodeFid: number // 父节点id
  nodeName: string // 新增节点名称
  fileDesc: string // 节点描述
}

/**
 * @desc: 新增/更新模型信息
 */
export interface UpdateModelScriptInfoInterface {
  id: number
  fileType: string
  fileContent: string
}

/**
 * @desc: 发布/撤回脚本
 */
export interface ReleaseModelScriptInterface {
  id: number
  status: string
}

/**
 * @desc: 重命名节点名称
 */
export interface RenameNodeNameInterface {
  id: number
  nodeName: string
}

/**
 * @desc: 执行脚本
 */
export interface RunModelScriptInterface {
  fileContent: string
  fileType: string
  nodeName: string
}

/**
 * @desc: 获取资源详情样例表
 */
export interface GetResourceTableListInterface {
  database: string
  table: string
}

// -------------------------------------- 流程中心 -----------------------------------------------

/**
 * @desc: 获取流程列表
 */
export interface GetFlowListInterface {
  current: number
  size: number
  flowName: string
}

/**
 * @desc 新增/更新单个节点
 * @param extension 节点对象
 * @param flowId 流程id
 * @param nodeId 节点DOMid
 * @param scriptId 模型id
 * @param id 节点id(有则更新，无则新增)
 */
export interface SaveFlowNodeInterface {
  description: string
  extension: string
  flowId: number
  name: string
  nodeId: string
  params: string
  scriptId: number
  id?: number
}

/**
 * @desc 保存全局流程
 * @param flowName 流程名称
 * @param id 流程id
 * @param nodeDependency 节点连接关系
 * @param nodes 节点信息
 */
export interface SaveGlobalFlowInterface {
  flowName: string
  id: number
  nodeDependency: any[]
  nodes: any[]
}

/**
 * @desc 查询流程执行状态
 */
export interface QueryFlowExecutingStateInterface {
  flowExecId: string
  flowId: string
}

/**
 * @desc 获取节点日志
 */
export interface GetNodeExecutingLogInterface {
  execDate: string
  flowExecId: string
  flowId: string
  nodeId: string
  fromLineNum?: number
  limit?: number
}

// -------------------------------------- 任务调度 -----------------------------------------------

/**
 * @desc: 获取任务调度列表
 */
export interface GetDevelopmentListInterface {
  current: number
  size: number
  srcTable?: string
}

/**
 * @desc: 新增/更新调度详情
 */
export interface SaveDevelopmentInfoInterface {
  scriptId: number
  cron: string
  id?: number
  sysUserId: number
  sysUsername: string
}

/**
 * @desc: 修改任务调度状态
 */
export interface ChangeDevelopmentStatusInterface {
  id: number
  status: string
}

// -------------------------------------- 任务监控 -----------------------------------------------

/**
 * @desc 获取任务监控列表
 */
export interface GetTaskMonitorListInterface {
  current: number
  size: number
  scriptName?: string
}

/**
 * @desc 获取任务监控日志
 */
export interface GetMonitorLogInfoInterface {
  execId: string
  execDate: string
  jobId: string
  fromLineNum?: string
}

/**
 * @desc 查询流程中子节点
 */
export interface IGetFlowNodesList extends IPaging {
  flowNodeName: string
  execId: string
  flowId: number
}

/**
 * @desc 下载日志
 */
export interface IDownloadLogs {
  execDate: string // 执行日期
  execId: string // job执行唯一标识
  jobId: string // job唯一标识
}
