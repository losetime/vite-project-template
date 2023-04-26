import { $http } from '../http'

import { IGetPersonList, IGetTrainRecordList } from '../types/vrTrain'

enum Api {
  getTrainStats = '/vrserver/vrexam/selectExamInfo',
  getPositionDistribution = '/vrserver/vrexam/selectExamPersonPostDistribution',
  getFavoriteCourse = '/vrserver/vrexam/selectPopularCourse',
  getLearningStar = '/vrserver/vrexam/selectStarLearning',

  getPersonList = '/vrserver/userbind/selectUserExamDateil',
  getTrainRecordList = '/vrserver/userbind/selectUserExamData',
}

// -------------------------------------- 培训总览 -----------------------------------------------

/**
 * @description: 获取培训详情统计
 */
export function apiGetTrainStats() {
  return $http.request({
    url: Api.getTrainStats,
    method: 'GET',
  })
}

/**
 * @description: 获取岗位分布
 */
export function apiGetPositionDistribution() {
  return $http.request({
    url: Api.getPositionDistribution,
    method: 'GET',
  })
}

/**
 * @description: 获取最受欢迎课程
 */
export function apiGetFavoriteCourse() {
  return $http.request({
    url: Api.getFavoriteCourse,
    method: 'GET',
  })
}

/**
 * @description: 获取学习之星
 */
export function apiGetLearningStar() {
  return $http.request({
    url: Api.getLearningStar,
    method: 'GET',
  })
}

// -------------------------------------- 人员培训 -----------------------------------------------

/**
 * @description: 获取培训统计列表
 */
export function apiGetPersonList(params: IGetPersonList) {
  return $http.request({
    url: Api.getPersonList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取培训记录列表
 */
export function apiGetTrainRecordList(params: IGetTrainRecordList) {
  return $http.request({
    url: Api.getTrainRecordList,
    method: 'GET',
    params,
  })
}
