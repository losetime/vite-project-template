import { $http } from '../http'

import {
  GetOperateMenuListInterface,
  GetOperateMenuDetailInterface,
  CreatOperateMenuDetailInterface,
  UpdateOperateMenuDetailInterface,
  GetOperateAuthListInterface,
  GetOperateAuthDetailInterface,
  CreatOperateAuthDetailInterface,
  UpdateOperateAuthDetailInterface,
  GetConsignorAuthListInterface,
  GetConsignorAuthDetailInterface,
  CreatConsignorAuthDetailInterface,
  DeleteOperateAuthListInterface,
  DeleteConsignorAuthListInterface,
  GetMenuEnumListInterface,
} from '../types/auth'

enum Api {
  getOperateMenuList = '/menu/menu/index',
  getMenuEnumList = '/menu/menu/authEnum',
  getOperateMenuDetail = '/menu/menu/detail',
  creatOperateMenuDetail = '/menu/menu/menuInfoStore',
  updateOperateMenuDetail = '/menu/menu/menuInfoUpdate',

  getOperateAuthList = '/menu/menu/authorityIndex',
  getOperateAuthDetail = '/menu/menu/authorityDetail',
  creatOperateAuthDetail = '/menu/menu/authorityStore',
  updateOperateAuthDetail = '/menu/menu/authorityUpdate',
  deleteOperateAuthList = '/menu/menu/delMenu',

  getConsignorAuthList = '/menu/driverMenu/index',
  getConsignorAuthDetail = '/menu/driverMenu/detail',
  creatConsignorAuthDetail = '/menu/driverMenu/menuInfoStore',
  updateConsignorAuthDetail = '/menu/menu/menuInfoUpdate',
  deleteConsignorAuthList = '/menu/driverMenu/delMenu',
}

/**
 * @description: 获取运营菜单列表
 */
export function getOperateMenuList(params: GetOperateMenuListInterface) {
  return $http.request({
    url: Api.getOperateMenuList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取运营菜单详情
 */
export function getOperateMenuDetail(params: GetOperateMenuDetailInterface) {
  return $http.request({
    url: Api.getOperateMenuDetail,
    method: 'GET',
    params,
  })
}

/**
 * @description: 创建运营菜单详情
 */
export function creatOperateMenuDetail(params: CreatOperateMenuDetailInterface) {
  return $http.request({
    url: Api.creatOperateMenuDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 更新运营菜单详情
 */
export function updateOperateMenuDetail(params: UpdateOperateMenuDetailInterface) {
  return $http.request({
    url: Api.updateOperateMenuDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取运营权限列表
 */
export function getOperateAuthList(params: GetOperateAuthListInterface) {
  return $http.request({
    url: Api.getOperateAuthList,
    method: 'GET',
    params,
  })
}

/**
 * @description: 获取运营权限详情
 */
export function getOperateAuthDetail(params: GetOperateAuthDetailInterface) {
  return $http.request({
    url: Api.getOperateAuthDetail,
    method: 'GET',
    params,
  })
}

/**
 * @description: 创建运营权限详情
 */
export function creatOperateAuthDetail(params: CreatOperateAuthDetailInterface) {
  return $http.request({
    url: Api.creatOperateAuthDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 更新运营权限详情
 */
export function updateOperateAuthDetail(params: UpdateOperateAuthDetailInterface) {
  return $http.request({
    url: Api.updateOperateAuthDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 删除运营权限
 */
export function deleteOperateAuthList(params: DeleteOperateAuthListInterface) {
  return $http.request({
    url: Api.deleteOperateAuthList,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取货主菜单详情
 */
export function getConsignorAuthList(params: GetConsignorAuthListInterface) {
  return $http.request({
    url: Api.getConsignorAuthList,
    method: 'POST',
    params,
  })
}

/**
 * @description: 获取货主菜单详情
 */
export function getConsignorAuthDetail(params: GetConsignorAuthDetailInterface) {
  return $http.request({
    url: Api.getConsignorAuthDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 创建货主菜单详情
 */
export function creatConsignorAuthDetail(params: CreatConsignorAuthDetailInterface) {
  return $http.request({
    url: Api.creatConsignorAuthDetail,
    method: 'POST',
    params,
  })
}

/**
 * @description: 删除货主权限
 */
export function deleteConsignorAuthList(params: DeleteConsignorAuthListInterface) {
  return $http.request({
    url: Api.deleteConsignorAuthList,
    method: 'POST',
    params,
  })
}

/**
 * @description: 一级菜单枚举
 */
export function getMenuEnumList(params: GetMenuEnumListInterface) {
  return $http.request({
    url: Api.getMenuEnumList,
    method: 'GET',
    params,
  })
}
