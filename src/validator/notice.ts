/**
 * 通知中心
 */
import { reactive } from 'vue'
import { normValidator } from './common'
import { phoneReg } from '../enums/regExpEnum'

// ---------------------------------- 告警配置 ------------------------------------------

export const alarmConfigDetailRules = reactive({
  name: [{ required: true, message: '姓名不能为空', trigger: 'change' }],
  phonenumber: [
    {
      validator: (rule: any, value: string) => normValidator(rule, value, phoneReg, '手机号格式错误'),
      trigger: 'change',
    },
  ],
})
