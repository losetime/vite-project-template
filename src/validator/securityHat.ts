/**
 * 通知中心
 */
import { reactive } from 'vue'

// ---------------------------------- 告警配置 ------------------------------------------

export const peopleBindDetailRules = reactive({
  bindIdentity: [{ required: true, message: '请选择绑定人员', trigger: 'change' }],
})
