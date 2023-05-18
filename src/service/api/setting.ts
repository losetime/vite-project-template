import { $http } from '../http/index'

import {
  IGetUserList,
  IModifyUserStatus,
  IAddUser,
  IModifyPassword,
  IGetRoleList,
  IModifyRoleStatus,
  IAddRole,
  IGetMenuList,
  IAddMenuDetail,
  IGetDeptList,
  IAddDept,
  IGetLogsList,
  IUpdatePassword,
} from '../types/setting'

enum Api {
  getDepartmentList = '/usermanager/system/dept/treeselect',
  getUserList = '/usermanager/system/user/list',
  modifyUserStatus = '/usermanager/system/user/changeStatus',
  handleUserDetail = '/usermanager/system/user',
  updateUser = '/usermanager/system/user/edit',
  modifyPassword = '/usermanager/system/user/resetPwd',

  getRoleList = '/usermanager/system/role/list',
  modifyRoleStatus = '/usermanager/system/role/changeStatus',
  getMenuTree = '/usermanager/system/menu/treeselect',
  getSelectedMenuTree = '/usermanager/system/menu/roleMenuTreeselect',
  getRoleDetail = '/usermanager/system/role',
  updateRoleDetail = '/usermanager/system/role/edit',

  getMenuList = '/usermanager/system/menu/list',
  getMenuDetail = '/usermanager/system/menu',
  updateMenuDetail = '/usermanager/system/menu/edit',

  handleDeptDetail = '/usermanager/system/dept/list',
  delDept = '/usermanager/system/dept',
  getDeptDetail = '/usermanager/system/dept',
  addDateDept = '/usermanager/system/dept',
  updateDept = '/usermanager/system/dept/edit',

  getLogsList = '/usermanager/monitor/operlog/list',
  exportLogs = '/usermanager/monitor/operlog/export',

  getUserInfo = '/usermanager/system/user/profile',
  updatePassword = '/usermanager/system/user/profile/updatePwd',
  killUser = '/usermanager/system/user/profile/cancelled',
}

// -------------------------------------- 用户管理 -----------------------------------------------

/**
 * @desc: 获取部门树列表
 */
export function apiGetDepartmentList(): Promise<any> {
  return $http.request({
    url: Api.getDepartmentList,
    method: 'GET',
  })
}

/**
 * @desc: 获取用户列表
 */
export function apiGetUserList(params: IGetUserList): Promise<any> {
  return $http.request({
    url: Api.getUserList,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 修改用户状态
 */
export function apiModifyUserStatus(params: IModifyUserStatus): Promise<any> {
  return $http.request({
    url: Api.modifyUserStatus,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 查询用户详情
 */
export function apiGetUserDetail(params: { userId: number }): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail + `/${params.userId}`,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 新增用户信息
 */
export function apiAddUser(params: IAddUser): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 更新用户信息
 */
export function apiUpdateUser(params: IAddUser): Promise<any> {
  return $http.request({
    url: Api.updateUser,
    method: 'POST',
    params,
  })
}

/**
 * @desc: 删除用户
 */
export function apiDeleteUser(params: { userId: number }): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail + `/${params.userId}`,
    method: 'POST',
  })
}

/**
 * @desc 修改密码
 */
export function apiModifyPassword(params: IModifyPassword) {
  return $http.request({
    url: Api.modifyPassword,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 角色管理 -----------------------------------------------

/**
 * @desc 获取角色列表
 */
export function apiGetRoleList(params: IGetRoleList) {
  return $http.request({
    url: Api.getRoleList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除角色
 */
export function apiDeleteRole(params: { roleId: number }) {
  return $http.request({
    url: Api.getRoleDetail + `/${params.roleId}`,
    method: 'POST',
  })
}

/**
 * @desc: 修改角色状态
 */
export function apiModifyRoleStatus(params: IModifyRoleStatus): Promise<any> {
  return $http.request({
    url: Api.modifyRoleStatus,
    method: 'POST',
    params,
  })
}

/**
 * @desc 获取全部菜单树
 */
export function apiGetMenuTree(): Promise<any> {
  return $http.request({
    url: Api.getMenuTree,
    method: 'GET',
  })
}

/**
 * @desc 获取角色已选择菜单树
 */
export function apiGetSelectedMenuTree(params?: { roleId: number }): Promise<any> {
  const roleId = params?.roleId ? `/${params.roleId}` : ''
  return $http.request({
    url: Api.getSelectedMenuTree + roleId,
    method: 'GET',
  })
}

/**
 * @desc 获取角色详情
 */
export function apiGetRoleDetail(params: { roleId: number }): Promise<any> {
  return $http.request({
    url: Api.getRoleDetail + `/${params.roleId}`,
    method: 'GET',
  })
}

/**
 * @desc 新增角色
 */
export function apiAddRole(params: IAddRole): Promise<any> {
  return $http.request({
    url: Api.getRoleDetail,
    method: 'POST',
    params,
  })
}

/**
 * @desc 更新角色信息
 */
export function apiUpdateRole(params: IAddRole): Promise<any> {
  return $http.request({
    url: Api.updateRoleDetail,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 菜单管理 -----------------------------------------------

/**
 * @desc 获取菜单列表
 */
export function apiGetMenuList(params: IGetMenuList): Promise<any> {
  return $http.request({
    url: Api.getMenuList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除菜单列表
 */
export function apiDelMenuList(params: { menuId: number }): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail + `/${params.menuId}`,
    method: 'POST',
  })
}

/**
 * @desc 获取菜单详情
 */
export function apiGetMenuDetail(params: { menuId: number }): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail + `/${params.menuId}`,
    method: 'GET',
  })
}

/**
 * @desc 添加菜单详情
 */
export function apiAddMenuDetail(params: IAddMenuDetail): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail,
    method: 'POST',
    params,
  })
}

/**
 * @desc 更新菜单详情
 */
export function apiUpdateMenuDetail(params: IAddMenuDetail): Promise<any> {
  return $http.request({
    url: Api.updateMenuDetail,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 部门管理 -----------------------------------------------

/**
 * @desc 获取角色列表
 */
export function apiGetDeptList(params: IGetDeptList) {
  return $http.request({
    url: Api.handleDeptDetail,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除部门
 */
export function apiDeleteDept(params: { deptId: number }) {
  return $http.request({
    url: Api.delDept + `/${params.deptId}`,
    method: 'POST',
  })
}

/**
 * @desc 获取部门详情
 */
export function apiGetDeptDetail(params: { deptId: number }) {
  return $http.request({
    url: Api.getDeptDetail + `/${params.deptId}`,
    method: 'GET',
  })
}

/**
 * @desc 新增部门
 */
export function apiAddDept(params: IAddDept) {
  return $http.request({
    url: Api.addDateDept,
    method: 'POST',
    params,
  })
}

/**
 * @desc 更新部门
 */
export function apiUpdateDept(params: IAddDept) {
  return $http.request({
    url: Api.updateDept,
    method: 'POST',
    params,
  })
}

// -------------------------------------- 操作日志 -----------------------------------------------

/**
 * @desc 获取日志列表
 */
export function apiGetLogsList(params: IGetLogsList) {
  return $http.request({
    url: Api.getLogsList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 导出日志
 */
export function apiExportLogs() {
  return $http.request({
    url: Api.exportLogs,
    method: 'GET',
    responseType: 'blob',
  })
}

// -------------------------------------- 操作日志 -----------------------------------------------

/**
 * @desc 获取用户信息
 */
export function apiGetUserInfo(): Promise<any> {
  return $http.request({
    url: Api.getUserInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取用户信息
 */
export function apiUpdatePassword(params: IUpdatePassword) {
  return $http.request({
    url: Api.updatePassword,
    method: 'POST',
    params,
  })
}

/**
 * @desc 注销用户
 */
export function apiKillUser(params: { password: string }): Promise<any> {
  return $http.request({
    url: Api.killUser,
    method: 'POST',
    params,
  })
}
