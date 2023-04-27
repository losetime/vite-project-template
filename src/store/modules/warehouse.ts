import { defineStore } from 'pinia'
import { store } from '@/store'
import { ResultEnum } from '@/enums/httpEnum'
import { apiGetMsgReminderNum } from '@/service/api/common'
interface Warehouse {
  cycleReminderNum: number
}

export const useWarehouseStore = defineStore({
  id: 'warehouse',
  state: (): Warehouse => ({
    cycleReminderNum: 0,
  }),
  actions: {
    /**
     * @desc 获取未读消息数
     */
    async GetMsgReminderNum() {
      const { code, data } = await apiGetMsgReminderNum({ dataType: 'today_overCheckNum' })
      if (code === ResultEnum.SUCCESS) {
        this.cycleReminderNum = parseInt(data)
      }
    },
  },
})

// Need to be used outside the setup
export function useWarehouseStoreWithOut() {
  return useWarehouseStore(store)
}
