// -------------------------------------- 系统设置 -----------------------------------------------

// 用户管理
export const userColumns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '用户名称',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '用户昵称',
    key: 'nickName',
    dataIndex: 'nickName',
  },
  {
    title: '部门',
    key: 'deptName',
    customRender: ({ record }: { record: any }) => record.dept.deptName,
  },
  {
    title: '手机号码',
    key: 'phonenumber',
    dataIndex: 'phonenumber',
  },
  {
    title: '账号类型',
    key: 'agingType',
    customRender: ({ record }: { record: any }) => (record.agingType === 'LongTime' ? '长期账号' : '临时账号'),
  },
  {
    title: '到期时间',
    key: 'expiration',
    customRender: ({ record }: { record: any }) => (record.agingType === 'LongTime' ? '永久' : record.expiration),
  },
  {
    title: '状态',
    key: 'status',
    customRender: ({ record }: { record: any }) => {
      switch (record.status) {
        case '0':
          return '启用'
        case '1':
          return '停用'
        case '3':
          return '已注销'
        case '4':
          return '休眠'
      }
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 200,
  },
]

// 角色管理
export const roleColumns = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    key: 'roleId',
  },
  {
    title: '角色名称',
    key: 'roleName',
    dataIndex: 'roleName',
  },
  {
    title: '权限字符',
    key: 'roleKey',
    dataIndex: 'roleKey',
  },
  {
    title: '显示顺序',
    key: 'roleSort',
    dataIndex: 'roleSort',
  },
  {
    title: '状态',
    key: 'slotOne',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 菜单管理
export const menuColumns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '图标',
    key: 'icon',
    dataIndex: 'icon',
    width: 180,
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
    width: 80,
  },
  {
    title: '权限标识',
    key: 'perms',
    dataIndex: 'perms',
    width: 100,
  },
  {
    title: '组件路径',
    key: 'component',
    dataIndex: 'component',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 部门管理
export const deptColumns = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 系统日志
export const logsColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '操作人',
    key: 'operName',
    dataIndex: 'operName',
  },
  {
    title: '操作菜单',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: '请求方法',
    key: 'requestMethod',
    dataIndex: 'requestMethod',
  },
  {
    title: '业务类型',
    key: 'businessType',
  },
  {
    title: '操作时间',
    key: 'operTime',
    dataIndex: 'operTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]
