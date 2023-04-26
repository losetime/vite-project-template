import { createVNode } from 'vue'

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
    key: 'slotOne',
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
    key: 'slotOne',
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

// -------------------------------------- 人员管理 -----------------------------------------------

// 现场人员统计-关键人员到岗到位
export const KeystaffArrivalColumns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '项目部',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '岗位',
    key: 'postName',
    dataIndex: 'postName',
  },
  {
    title: '今日到岗时间',
    key: 'slotOne',
  },
]

// 现场人员统计-人员到场情况
export const staffTurnUpColumns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '项目部类别',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '单位',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '准入状态',
    key: 'passFlag',
    customRender: ({ record }: { record: any }) => (record.passFlag === '0' ? '未准入' : '已准入'),
  },
  {
    title: '入场时间',
    key: 'inTime',
    dataIndex: 'inTime',
  },
  {
    title: '出场时间',
    key: 'outTime',
    dataIndex: 'outTime',
  },
]

// 人员信息列表
export const staffInfoColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '身份证号',
    key: 'identity',
    dataIndex: 'identity',
    width: 180,
  },
  {
    title: '项目部',
    key: 'slotOne',
    dataIndex: 'departTypeName',
  },
  {
    title: '岗位',
    key: 'postName',
    dataIndex: 'postName',
  },
  {
    title: '人员类型',
    key: 'userType',
    dataIndex: 'userType',
  },
  {
    title: '准入状态',
    key: 'passFlag',
    customRender: ({ record }: { record: any }) =>
      record.passFlag === '1'
        ? createVNode('span', { style: { color: '#52C41A' } }, '已准入')
        : createVNode('span', { style: { color: '#FF4D4F' } }, '未准入'),
  },
  {
    title: '人脸',
    key: 'slotTwo',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 200,
  },
]

// 人员信息列表-不需要操作列，可选择
export const staffInfoListColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '身份证号',
    key: 'identity',
    dataIndex: 'identity',
  },
  // {
  //   title: '学历',
  //   key: 'education',
  //   dataIndex: 'education',
  // },
  {
    title: '人员类型',
    key: 'userType',
    dataIndex: 'userType',
  },
  {
    title: '项目部',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '岗位',
    key: 'postName',
    dataIndex: 'postName',
  },
  {
    title: '单位',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '准入状态',
    key: 'passFlag',
    customRender: ({ record }: { record: any }) => (record.passFlag === '0' ? '未准入' : '已准入'),
  },
]

// 人员所属工程列表
export const staffBelongProjectColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工程名称',
    key: 'projectName',
    dataIndex: 'projectName',
  },
  {
    title: '工作票号',
    key: 'ticketNo',
    dataIndex: 'ticketNo',
  },
  {
    title: '工作区域',
    key: 'workPart',
    dataIndex: 'workPart',
  },
  {
    title: '计划开始时',
    key: 'beginDate',
    dataIndex: 'beginDate',
  },
  {
    title: '计划完成时',
    key: 'planEndDate',
    dataIndex: 'planEndDate',
  },
  {
    title: '工作内容',
    key: 'workContent',
    dataIndex: 'workContent',
  },
]

// 人员进出管理
export const staffInAndOutColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '项目部',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '岗位',
    key: 'postName',
    dataIndex: 'postName',
  },
  {
    title: '单位',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '进出类型',
    key: 'slotOne',
  },
  {
    title: '识别类型',
    key: 'authType',
    dataIndex: 'authType',
  },
  {
    title: '时间',
    key: 'accessTime',
    dataIndex: 'accessTime',
  },
]

// 关键人员履职
export const keyStaffDutyColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '项目部',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '人员类别',
    key: 'userType',
    dataIndex: 'userType',
  },
  {
    title: '单位',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 履职交叉列表
export const dutyCrossColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '单项工程编码',
    key: 'singleProjectCode',
    dataIndex: 'singleProjectCode',
  },
  {
    title: '标段编码',
    key: 'sectionCode',
    dataIndex: 'sectionCode',
  },
  {
    title: '加入时间',
    key: 'joinDate',
    dataIndex: 'joinDate',
  },
  {
    title: '离开时间',
    key: 'exitDate',
    dataIndex: 'exitDate',
  },
  {
    title: '标段名称',
    key: 'bidName',
    dataIndex: 'bidName',
  },
]

// 关键人员离岗
export const keyStaffDepartColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '项目部',
    key: 'departTypeName',
    dataIndex: 'departTypeName',
  },
  {
    title: '岗位',
    key: 'postName',
    dataIndex: 'postName',
  },
  {
    title: '最大允许离岗时长(分)',
    key: 'maxLeave',
    dataIndex: 'maxLeave',
  },
  {
    title: '单位',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '离岗时间',
    key: 'outTime',
    dataIndex: 'outTime',
  },
  {
    title: '回岗时间',
    key: 'inTime',
    dataIndex: 'inTime',
  },
  {
    title: '离岗时长(分)',
    key: 'leaveTime',
    dataIndex: 'leaveTime',
  },
]

// 特殊(临时)人员列表
export const temporaryStaffColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '人脸',
    key: 'slotOne',
  },
  {
    title: '备注',
    key: 'unitName',
    dataIndex: 'unitName',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 岗位维护
export const postInfoColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '岗位编码',
    key: 'value',
    dataIndex: 'value',
  },
  {
    title: '岗位名称',
    key: 'label',
    dataIndex: 'label',
  },
  {
    title: '是否关键岗位',
    key: 'other',
    customRender: ({ record }: { record: any }) => (record.other === 'key' ? '是' : '否'),
  },
  {
    title: '操作',
    key: 'action',
  },
]

// LED管理
export const LEDHistoryColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '人员在场情况',
    dataIndex: 'people',
    key: 'people',
  },
  {
    title: '风险规则',
    dataIndex: 'recovery',
    key: 'recovery',
  },
  {
    title: '通知内容',
    dataIndex: 'work',
    key: 'work',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
]

// -------------------------------------- 车辆管理 -----------------------------------------------

// 车辆管理-车辆统计
export const vehicleStatsColumns = [
  {
    title: '车辆牌照号',
    dataIndex: 'carNo',
    key: 'carNo',
  },
  {
    title: '卡类型',
    key: 'carCardTypeId',
    dataIndex: 'carCardTypeId',
  },
  {
    title: '进出类型',
    key: 'recordType',
    customRender: ({ record }: { record: any }) => (record.recordType === '1' ? '进' : '出'),
  },
  {
    title: '记录时间',
    key: 'recordTime',
    dataIndex: 'recordTime',
  },
]

// 车辆管理-车辆进出场
export const vehicleInAndOutColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '车辆牌照号',
    dataIndex: 'carNo',
    key: 'carNo',
  },
  {
    title: '卡类型',
    key: 'slotOne',
  },
  {
    title: '进出类型',
    key: 'recordType',
    customRender: ({ record }: { record: any }) => (record.recordType === '1' ? '进' : '出'),
  },
  {
    title: '进出时长',
    key: 'inOutTime',
    dataIndex: 'inOutTime',
  },
  {
    title: '记录时间',
    key: 'recordTime',
    dataIndex: 'recordTime',
  },
  {
    title: '责任人',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '制证卡号',
    key: 'carCardNo',
    dataIndex: 'carCardNo',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 车辆管理-车辆管理-常驻车辆
export const permanentVehicleColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '车辆牌照号',
    dataIndex: 'carNo',
    key: 'carNo',
  },
  {
    title: '车辆类型',
    key: 'slotOne',
  },
  {
    title: '责任人',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '所属项目部',
    key: 'bidName',
    dataIndex: 'bidName',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 车辆管理-车辆管理-临时车辆
export const temporaryVehicleColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '车辆牌照号',
    dataIndex: 'carNo',
    key: 'carNo',
  },
  {
    title: '车辆类型',
    key: 'slotOne',
  },
  {
    title: '责任人',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '责任人单位',
    key: 'unit',
    dataIndex: 'unit',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// -------------------------------------- 智能仓储 -----------------------------------------------

// 标签写入
export const tagReadInColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: 'RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagName',
    key: 'toolTagName',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeName',
    key: 'toolTypeName',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModelName',
    key: 'toolModelName',
  },
  {
    title: '内控编码',
    dataIndex: 'controlNum',
    key: 'controlNum',
  },
  {
    title: '检验周期',
    key: 'manufacturer',
    customRender: ({ record }: { record: any }) => `${record.inspectStart}~${record.inspectEnd}`,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 工器具台账
export const toolsAccountColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: 'RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagName',
    key: 'toolTagName',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeName',
    key: 'toolTypeName',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModelName',
    key: 'toolModelName',
  },
  {
    title: '内控编码',
    dataIndex: 'controlNum',
    key: 'controlNum',
  },
  {
    title: '检验周期',
    key: 'manufacturer',
    customRender: ({ record }: { record: any }) => `${record.inspectStart}~${record.inspectEnd}`,
  },
  {
    title: '状态',
    key: 'slotOne',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 领还记录
export const receiveRecordColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: 'RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
  {
    title: '姓名',
    dataIndex: 'recipientName',
    key: 'recipientName',
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagName',
    key: 'toolTagName',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeName',
    key: 'toolTypeName',
  },
  {
    title: '领用时间',
    key: 'slotTwo',
    width: 240,
  },
  {
    title: '归还时间',
    key: 'slotThree',
    width: 240,
  },
  {
    title: '状态',
    key: 'slotOne',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 检验周期
export const cycleReminderColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: 'RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagName',
    key: 'toolTagName',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeName',
    key: 'toolTypeName',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModelName',
    key: 'toolModelName',
  },
  {
    title: '内控编码',
    dataIndex: 'controlNum',
    key: 'controlNum',
  },
  {
    title: '检验周期',
    key: 'manufacturer',
    customRender: ({ record }: { record: any }) => `${record.inspectStart}~${record.inspectEnd}`,
    width: 200,
  },
  {
    title: '在库状态',
    key: 'slotOne',
  },
  {
    title: '距离脱检',
    key: 'restOfDCheckDay',
    customRender: ({ record }: { record: any }) =>
      record.restOfDCheckDay >= 0 ? `${record.restOfDCheckDay}天` : '已脱检',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 数据维护-仓库管理
export const repositoryColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '仓库名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仓库编号',
    dataIndex: 'codeNum',
    key: 'codeNum',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 数据维护-仓位管理
export const freightSpaceColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '仓位',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仓库',
    dataIndex: 'houseName',
    key: 'houseName',
  },
  {
    title: '对应类型',
    dataIndex: 'typesStr',
    key: 'typesStr',
  },
  {
    title: '对应型号',
    dataIndex: 'modelsStr',
    key: 'modelsStr',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 数据维护-工器具名称/型号
export const toolsRecordColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTag',
    key: 'toolTag',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolType',
    key: 'toolType',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModel',
    key: 'toolModel',
  },
]

// 可视化仓库状态
export const warehouseStatusColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: 'RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTagStr',
    key: 'toolTagStr',
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTypeStr',
    key: 'toolTypeStr',
  },
  {
    title: '工器具状态',
    key: 'slotOne',
  },
]

// 视频采集管理
export const videosCollectionColumns = [
  {
    title: '视频编号',
    dataIndex: 'num',
    key: 'num',
    width: 450,
  },
  {
    title: '视频时间',
    dataIndex: 'hms',
    key: 'hms',
  },
  {
    title: '视频类型',
    customRender: ({ record }: { record: any }) => `${record.status ? '正常' : '异常'}`,
  },
  {
    title: '摄像头编号',
    customRender: ({ record }: { record: any }) => `${record.channel}号摄像头`,
  },
  {
    title: '异常时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 盘点入库管理
export const warehouseCheckColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTag',
    key: 'toolTag',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolType',
    key: 'toolType',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModel',
    key: 'toolModel',
  },
  {
    title: '入库数量',
    dataIndex: 'stockNum',
    key: 'stockNum',
  },
  {
    title: '扫描数量',
    dataIndex: 'scanNum',
    key: 'scanNum',
  },
  {
    title: '实际入库数量',
    dataIndex: 'actualStockNum',
    key: 'actualStockNum',
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   align: 'center',
  // },
]

// 盘点入库管理-查看工器具
export const checkToolsRecordColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagStr',
    key: 'toolTagStr',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeStr',
    key: 'toolTypeStr',
  },
  {
    title: '工器具型号',
    dataIndex: 'modelStr',
    key: 'modelStr',
  },
  {
    title: '工器具RFID编码',
    dataIndex: 'epc',
    key: 'epc',
  },
]

// 库存预警
export const stockWarningColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTag',
    key: 'toolTag',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolType',
    key: 'toolType',
  },
  {
    title: '工器具型号',
    dataIndex: 'toolModel',
    key: 'toolModel',
  },
  {
    title: '库存数量',
    key: 'slotOne',
  },
]

// 重点工器具领用分析
export const receiveAnalysisColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTag',
    key: 'toolTag',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolType',
    key: 'toolType',
  },
]

// 重点工器具领用分析-漏领工器具
export const LeakReceiveToolsColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '工器具分类',
    dataIndex: 'toolTagStr',
    key: 'toolTagStr',
  },
  {
    title: '工器具名称',
    dataIndex: 'toolTypeStr',
    key: 'toolTypeStr',
  },
  {
    title: '工器具型号',
    dataIndex: 'modelStr',
    key: 'modelStr',
  },
  {
    title: '对应工作内容',
    dataIndex: 'toolPlanContent',
    key: 'toolPlanContent',
    width: 300,
  },
]

// -------------------------------------- 安全宝 -----------------------------------------------

// 安全宝-告警详情列表
export const alarmDetailColumns = (alarmTypeOptions: any[]) => {
  return [
    {
      title: '序号',
      key: 'serialNumber',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'personName',
      key: 'personName',
    },
    {
      title: '告警类别',
      key: 'event',
      customRender: ({ record }: { record: any }) => {
        const findItem = alarmTypeOptions.find((val: any) => record.event === val.value)
        if (findItem) {
          return findItem.label === 'SOS' ? findItem.label : findItem.label + '过高'
        } else {
          return '-'
        }
      },
    },
    {
      title: '数值',
      key: 'keyType',
      customRender: ({ record }: { record: any }) => {
        switch (record.event) {
          case 'AlarmHeart':
            return record.heartRate + '次/分'
          case 'AlarmTemp':
            return record.bodyTemp + '℃'
          case 'AlarmBlood':
            return record.bpHigh + '/' + record.bpLow + 'mmHg'
          case 'AlarmEFence':
            return record.efenceDistance + '米'
          default:
            return '-'
        }
      },
    },
    {
      title: '告警时间',
      key: 'dataTime',
      dataIndex: 'dataTime',
    },
  ]
}

// 安全宝-体征数据
export const signsDataColumns = [
  {
    title: '姓名',
    dataIndex: 'personName',
    key: 'personName',
  },
  {
    title: '心率(次/分)',
    key: 'heartRate',
    customRender: ({ record }: { record: any }) => record.heartRate || '-',
  },
  {
    title: '血压(mmHg)',
    key: 'bp',
    customRender: ({ record }: { record: any }) => (record.bpHigh || '-') + '/' + (record.bpLow || '-'),
  },
  {
    title: '体温(℃)',
    key: 'bodyTemp',
    customRender: ({ record }: { record: any }) => record.bodyTemp || '-',
  },
  {
    title: '上报时间',
    key: 'dataTime',
    dataIndex: 'dataTime',
  },
]

// -------------------------------------- VR培训 -----------------------------------------------
export const personTrainColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    key: 'userType',
  },
  {
    title: '项目部',
    dataIndex: 'departName',
    key: 'departName',
  },
  {
    title: '岗位',
    dataIndex: 'postName',
    key: 'postName',
  },
  {
    title: '单位',
    dataIndex: 'unitName',
    key: 'unitName',
  },
  {
    title: '培训课程数',
    dataIndex: 'courseNum',
    key: 'courseNum',
  },
  {
    title: '培训时长',
    dataIndex: 'examTimeStr',
    key: 'examTimeStr',
  },
]

export const trainRecordColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    key: 'userType',
  },
  {
    title: '项目部',
    dataIndex: 'departName',
    key: 'departName',
  },
  {
    title: '岗位',
    dataIndex: 'postName',
    key: 'postName',
  },
  {
    title: '培训时长',
    dataIndex: 'examTimeStr',
    key: 'examTimeStr',
  },
  {
    title: '培训时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
]

// -------------------------------------- 安全帽 -----------------------------------------------

export const peopleBindColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '安全帽编号',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: '安全帽类型',
    key: 'slotOne',
  },
  {
    title: '已绑定人员',
    customRender: ({ record }: { record: any }) => (record.bindUserName ? record.bindUserName : '--'),
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// -------------------------------------- 通知中心 -----------------------------------------------
export const noticeCenterColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '通知类型',
    dataIndex: 'userType',
    key: 'userType',
  },
  {
    title: '数值',
    dataIndex: 'departName',
    key: 'departName',
  },
  {
    title: '时间',
    dataIndex: 'postName',
    key: 'postName',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

export const shortMessageAlarmColumns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '关键人员离岗',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '组塔抱杆',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '安全宝体征异常',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '边坡检测',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '安全宝SOS',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '环境监测',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '基础沉降监测',
    dataIndex: 'userName',
    key: 'userName',
  },
]

//--------------------组塔抱杆传感器列表 表头---------------------
export const sensorListColumns = [
  {
    title: '序号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '设备编号',
    dataIndex: 'nodeIp',
    key: 'nodeIp',
  },
  {
    title: '传感器类型',
    dataIndex: 'sensorType',
    key: 'sensorType',
    customRender: ({ record }: { record: any }) => {
      const sensorType: string = record.sensorType
      return { pulling: '拉力', angle: '倾角' }[sensorType]
    },
  },
  {
    title: '数值 (KN或°)',
    dataIndex: 'values',
    key: 'values',
  },
  {
    title: '时间',
    dataIndex: 'dataTime',
    key: 'dataTime',
  },
]
