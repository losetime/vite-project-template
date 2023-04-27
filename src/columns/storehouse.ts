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
    key: 'status',
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
    key: 'receiveTime',
    width: 240,
  },
  {
    title: '归还时间',
    key: 'returnTime',
    width: 240,
  },
  {
    title: '状态',
    key: 'status',
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
    key: 'status',
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
    key: 'status',
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
    key: 'existNum',
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
