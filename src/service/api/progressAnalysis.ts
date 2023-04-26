import { $http } from '../http/index'

import {
  EvaluationNodeRelationInterface,
  BidBindInterface,
  AddQualityEvaluationUnitProjectInterface,
  AddQualityEvaluationNodesInterface,
  AddScheduleItemInterface,
} from '../types/progressAnalysis'

enum Api {
  //查询质评表
  getQualityEvaluationSheet = '/person/cea/progress/qualityevaluationsheet/getQualityEvaluationSheet',

  //添加节点关系
  addQualityEvaluationNodeRelation = '/person/cea/progress/qualityevaluationsheet/addQualityEvaluationNodeRelation',

  //指定单位工程质评表节点添加
  addQualityEvaluationNodes = '/person/cea/progress/qualityevaluationsheet/addQualityEvaluationNodes',

  //添加质评表单位工程
  addQualityEvaluationUnitProject = '/person/cea/progress/qualityevaluationsheet/addQualityEvaluationUnitProject',

  //质评表类型标段绑定
  bidBind = '/person/cea/progress/qualityevaluationsheet/bidBind',

  //删除质评表节点-包含子级
  deleteQualityEvaluationNode = '/person/cea/progress/qualityevaluationsheet/deleteQualityEvaluationNode',

  //删除质评表节点关系
  deleteQualityEvaluationNodeRelation = '/person/cea/progress/qualityevaluationsheet/deleteQualityEvaluationNodeRelation',

  //查询工程类型绑定的标段
  // getBindBidNoByProjectType = '/person/cea/progress/qualityevaluationsheet/getBindBidNoByProjectType',
  getBindBidNoByProjectType = '/person/cea/progress/qualityevaluationsheet/listBidProjectTypeBinding',

  //查询单位工程模板树-指定单位工程新增节点用
  getUnitProjectTemplateTreeForAdd = '/person/cea/progress/qualityevaluationsheet/getUnitProjectTemplateTreeForAdd',

  //查询单位工程模板列表
  listUnitProjectTemplate = '/person/cea/progress/qualityevaluationsheet/listUnitProjectTemplate',

  //-----------------------------------施工进度计划表---------------------------------
  //查询施工进度计划列表
  scheduleSelectPage = '/person/visualprogressconstruction/selectPage',

  //批量删除施工进度计划
  batchDeleteSchedule = '/person/visualprogressconstruction/delete',

  //添加施工进度计划
  scheduleAdd = '/person/visualprogressconstruction/save',

  //更新施工进度计划
  scheduleUpdate = '/person/visualprogressconstruction/update',

  //查询质评项树
  selectCommentItemTree = '/person/visualprogressconstruction/selectCommentItemTree',

  //查询关联质评项
  selectRelatedCommentItem = '/person/visualprogressconstruction/selectRelatedCommentItem',

  //保存关联质评项
  saveRelatedCommentItem = '/person/visualprogressconstruction/saveRelatedCommentItem',

  //查询施工进度计划类型维护数量
  selectConstructionNum = '/person/visualprogressconstruction/selectConstructionNum',
}

/**
 * 查询关联质评项
 * @param progressId
 * @returns
 */
export const apiSelectRelatedCommentItem = (progressId: string) =>
  $http.request({
    url: Api.selectRelatedCommentItem,
    method: 'GET',
    params: { progressId },
  })
/**
 * 查询施工进度计划类型维护数量
 * @returns
 */
export const apiSelectConstructionNum = () =>
  $http.request({
    url: Api.selectConstructionNum,
    method: 'GET',
  })

/**
 * 查询质评项树
 * @param projectType
 * @returns
 */
export const apiSelectCommentItemTree = (projectType: string) =>
  $http.request({
    url: Api.selectCommentItemTree,
    method: 'GET',
    params: { projectType },
  })

/**
 * 查询施工进度计划列表
 * @param projectType
 * @returns
 */
export const apiScheduleSelectPage = (projectType: string) =>
  $http.request({
    url: Api.scheduleSelectPage,
    method: 'GET',
    params: { projectType },
  })
/**
 * 批量删除施工进度计划
 * @param data
 * @returns
 */
export const apiBatchDeleteSchedule = (data: Array<string>) =>
  $http.request({
    url: Api.batchDeleteSchedule,
    method: 'post',
    data,
  })
/**
 * 保存关联质评项
 * @param data
 * @returns
 */
export const apiSaveRelatedCommentItem = (data: any[]) =>
  $http.request({
    url: Api.saveRelatedCommentItem,
    method: 'post',
    data,
  })
/**
 * 添加或更新进度计划表
 * @param data
 * @returns
 */
export const apiScheduleAdd = (data: AddScheduleItemInterface) =>
  $http.request({
    url: data.id ? Api.scheduleUpdate : Api.scheduleAdd,
    method: 'post',
    data,
  })

/******************************************************************/
/**
 * 查询质评表
 * @param projectType
 * @returns
 */
export const apiGetQualityEvaluationSheet = (projectType: string) =>
  $http.request({
    url: Api.getQualityEvaluationSheet,
    method: 'GET',
    params: { projectType },
  })
/**
 * 查询工程类型绑定的标段
 * @returns
 */
export const apiGetBindBidNoByProjectType = () =>
  $http.request({
    url: Api.getBindBidNoByProjectType,
    method: 'GET',
  })
/**
 * 查询单位工程模板树-指定单位工程新增节点用
 * @param unitProjectNodeId
 * @returns
 */
export const apiGetUnitProjectTemplateTreeForAdd = (unitProjectNodeId: string) =>
  $http.request({
    url: Api.getUnitProjectTemplateTreeForAdd,
    method: 'GET',
    params: { unitProjectNodeId },
  })
/**
 * 查询单位工程模板列表
 * @param projectType
 * @returns
 */
export const apiListUnitProjectTemplate = (projectType: string) =>
  $http.request({
    url: Api.listUnitProjectTemplate,
    method: 'GET',
    params: { projectType },
  })
/**
 * 添加节点关系
 * @param data
 * @returns
 */
export const apiAddQualityEvaluationNodeRelation = (data: EvaluationNodeRelationInterface) =>
  $http.request({
    url: Api.addQualityEvaluationNodeRelation,
    method: 'post',
    data,
  })

/**
 * 指定单位工程质评表节点添加
 * @param data
 * @returns
 */
export const apiAddQualityEvaluationNodes = (data: AddQualityEvaluationNodesInterface) =>
  $http.request({
    url: Api.addQualityEvaluationNodes,
    method: 'post',
    data,
  })
/**
 * 添加质评表单位工程
 * @param data
 * @returns
 */
export const apiAddQualityEvaluationUnitProject = (data: AddQualityEvaluationUnitProjectInterface) =>
  $http.request({
    url: Api.addQualityEvaluationUnitProject,
    method: 'post',
    data,
  })
/**
 * 质评表类型标段绑定
 * @param data
 * @returns
 */
export const apiBidBind = (data: BidBindInterface) =>
  $http.request({
    url: Api.bidBind,
    method: 'post',
    data,
  })
/**
 * 删除质评表节点-包含子级
 * @param qualityEvaluationNodeId
 * @returns
 */
export const apiDeleteQualityEvaluationNode = (qualityEvaluationNodeId: string) =>
  $http.request({
    url: Api.deleteQualityEvaluationNode + '/' + qualityEvaluationNodeId,
    method: 'post',
  })
/**
 * 删除质评表节点关系
 * @param data
 * @returns
 */
export const apiDeleteQualityEvaluationNodeRelation = (data: EvaluationNodeRelationInterface) =>
  $http.request({
    url: Api.deleteQualityEvaluationNodeRelation,
    method: 'post',
    data,
  })
