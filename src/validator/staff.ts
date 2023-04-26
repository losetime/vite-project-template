/**
 * 人员管理表单验证规则
 */
import { reactive } from 'vue'
import { IdNoReg, phoneReg, backCardReg } from '../enums/regExpEnum'
import { normValidator } from './common'

// ---------------------------------- 人员管理 ------------------------------------------

export const staffBaseInfoRules = reactive({
  userName: [
    { required: true, message: '姓名不能为空', trigger: 'change' },
    { max: 30, message: '字符长度不能多于30位', trigger: 'change' },
  ],
  identity: [
    { required: true, message: '身份证号不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, IdNoReg, '身份证号格式错误'),
      trigger: 'change',
    },
  ],
  departTypeId: [{ required: true, message: '请选择项目部', trigger: 'change' }],
  postId: [{ required: true, message: '请选择岗位', trigger: 'change' }],
  userTypeId: [{ required: true, message: '请选择人员类型', trigger: 'change' }],
  unitId: [{ required: true, message: '请选择单位', trigger: 'change' }],
  nation: [{ max: 30, message: '字符长度不能多于30位', trigger: 'change' }],
  education: [{ max: 30, message: '字符长度不能多于30位', trigger: 'change' }],
  phoneNumber: [
    {
      validator: (rule: any, value: string) => normValidator(rule, value, phoneReg, '电话号码格式错误'),
      trigger: 'change',
    },
  ],
  idcard: [
    {
      validator: (rule: any, value: string) => normValidator(rule, value, backCardReg, '卡号格式输入错误'),
      trigger: 'change',
    },
  ],
})

// ---------------------------------- 特殊(临时)人员管理 ------------------------------------------

export const temporaryStaffRules = reactive({
  userName: [
    { required: true, message: '姓名不能为空', trigger: 'change' },
    { max: 30, message: '字符长度不能多于30位', trigger: 'change' },
  ],
  identity: [
    { required: true, message: '身份证号不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, IdNoReg, '身份证号格式错误'),
      trigger: 'change',
    },
  ],
})

// ---------------------------------- 人员进出管理 -----------------------------------------------

export const gateDetailRules = reactive({
  openTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  closeTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
})
