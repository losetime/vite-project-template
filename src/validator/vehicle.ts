/**
 * 车辆管理表单验证规则
 */
import { reactive } from 'vue'
import { picensePlateReg, IdNoReg, phoneReg } from '../enums/regExpEnum'
import { normValidator } from './common'

// ---------------------------------- 人员管理 ------------------------------------------

export const vehicleInfoRules = reactive({
  carNo: [
    { required: true, message: '车辆牌照号不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, picensePlateReg, '车辆牌照号格式错误'),
      trigger: 'change',
    },
  ],
  carTypeId: [{ required: true, message: '请选择车辆类型', trigger: 'change' }],
  carCardTypeId: [{ required: true, message: '请选择车辆卡类型', trigger: 'change' }],
  contractName: [
    {
      max: 100,
      message: '合同名称过长',
      trigger: 'change',
    },
  ],
  reason: [
    {
      max: 500,
      message: '事由文字过长',
      trigger: 'change',
    },
  ],
  identity: [
    {
      validator: (rule: any, value: string) => normValidator(rule, value, IdNoReg, '身份证号格式错误'),
      trigger: 'change',
    },
  ],
  phone: [
    {
      validator: (rule: any, value: string) => normValidator(rule, value, phoneReg, '手机号格式错误'),
      trigger: 'change',
    },
  ],
})
