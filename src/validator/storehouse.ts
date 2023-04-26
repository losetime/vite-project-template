/**
 * 智能仓储表单验证规则
 */
import { reactive } from 'vue'
import { normValidator } from './common'
import { notSpacingReg } from '@/enums/regExpEnum'

// ---------------------------------- 库存管理 ------------------------------------------

export const warehousingDetailRules = reactive({
  name: [
    { required: true, message: '仓位名称不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
  tag: [{ required: true, message: '请选择标签', trigger: 'change' }],
  toolTypeId: [{ required: true, message: '请选择器具类别', trigger: 'change' }],
  lastInspect: [{ required: true, message: '请选择上次检验时间', trigger: 'change' }],
  model: [
    { required: true, message: '型号不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
  manufacturer: [
    { required: true, message: '生产商不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
  codeNumber: [
    { required: true, message: '编号不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
})

// ---------------------------------- 信息管理 ------------------------------------------

export const freightSpaceDetailRules = reactive({
  name: [
    { required: true, message: '仓位名称不能为空', trigger: 'change' },
    { max: 10, message: '最多10个字符', trigger: 'change' },
  ],
  houseId: [{ required: true, message: '请选择所属仓库', trigger: 'change' }],
})

export const repositoryDetailRules = reactive({
  name: [
    { required: true, message: '仓库名称不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
  codeNum: [
    { required: true, message: '仓库编码不能为空', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '不能包含空格'),
      trigger: 'change',
    },
  ],
})

export const toolTypeDetailRules = reactive({
  toolTag: [{ required: true, message: '请选择标签', trigger: 'change' }],
  name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
  storeId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  positionId: [{ required: true, message: '请选择仓位', trigger: 'change' }],
  inspectCycle: [{ required: true, message: '检验周期不能为空', trigger: 'change' }],
})

// ---------------------------------- 标签写入 ------------------------------------------

export const TagReadInDetailRules = reactive({
  toolTag: [{ required: true, message: '请选择工器具分类', trigger: 'change' }],
  model: [{ required: true, message: '请选择工器具型号', trigger: 'change' }],
  meter: [{ required: true, message: '请选择单位', trigger: 'change' }],
  manufactureDate: [{ required: true, message: '请选择生产日期', trigger: 'change' }],
  inspectCycle: [{ required: true, message: '请选择检验周期', trigger: 'change' }],
  toolType: [{ required: true, message: '请选择工器具名称', trigger: 'change' }],
  epc: [{ required: true, message: 'FRID不能为空', trigger: 'change' }],
  manufacturer: [
    { required: true, message: '请输入生产厂家', trigger: 'change' },
    { max: 30, message: '最多30个字符', trigger: 'change' },
  ],
  buyDate: [{ required: true, message: '请选择购置日期', trigger: 'change' }],
})

// ---------------------------------------------------------------------------------------

export const ImportToolManifestRules = reactive({
  toolTag: [{ required: true, message: '请选择标签', trigger: 'change' }],
})
