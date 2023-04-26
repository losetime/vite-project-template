/**
 * @description: 获取运营菜单列表
 */
export interface GetOperateMenuListInterface {
  perPage: number
  pageNum: number
}

/**
 * @description: 获取运营菜单详情
 */
export interface GetOperateMenuDetailInterface {
  menuId: number
}

/**
 * @description: 创建运营菜单详情
 */
export interface CreatOperateMenuDetailInterface {
  menuName: string
  menuUrl: string
  shortName: string
  menuIcon: string
  parentId: number
  isDefault: number
  sort: number
}

/**
 * @description: 更新运营菜单详情
 */
export interface UpdateOperateMenuDetailInterface {
  menuId: number
  menuName: string
  menuUrl: string
  shortName: string
  menuIcon: string
  parentId: number
  isDefault: number
  sort: number
}

/**
 * @description: 获取运营权限列表
 */
export interface GetOperateAuthListInterface {
  perPage: number
  pageNum: number
  menuId: number | string
}

/**
 * @description: 获取运营权限详情
 */
export interface GetOperateAuthDetailInterface {
  authorityId: number
}

export interface CreatOperateAuthDetailInterface {
  authorityId: any
  authorityName: string // 权限名称
  authorityAlias: string // 权限标识
  menuId: number // 所属模块
  isDefault: number // 是否默认权限
  authorityList: Array<string> // 权限列表
}

export interface UpdateOperateAuthDetailInterface {
  authorityId: any
  authorityName: string // 权限名称
  authorityAlias: string // 权限标识
  menuId: number // 所属模块
  isDefault: number // 是否默认权限
  authorityList: Array<string> // 权限列表
}

/**
 * @description: 获取货主权限列表
 */
export interface GetConsignorAuthListInterface {
  perPage: number
  pageNum: number
}

/**
 * @description: 获取货主权限详情
 */
export interface GetConsignorAuthDetailInterface {
  menuId: number
}

/**
 * @description: 运营权限创建/更新
 */
export interface CreatConsignorAuthDetailInterface {
  menuId?: number
  menuName: string // 权限名称
  parentId: string // 父权限id
  url: string // 地址
  icon: string
  sort: string
  routes: Array<string> // 权限列表
}

/**
 * @description: 删除运营权限
 */
export interface DeleteOperateAuthListInterface {
  menuId: number
}

/**
 * @description: 删除货主运营权限
 */
export interface DeleteConsignorAuthListInterface {
  menuId: number
}

/**
 * @description: 一级菜单枚举
 */
export interface GetMenuEnumListInterface {
  value: number
  label: number
}
