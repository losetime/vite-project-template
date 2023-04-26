<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="600px"
  >
    <div class="inspection-done-wrapper">
      <div class="tip-wrap">请选择新的检验报告周期，确认后可入库正常出库</div>
      <div class="cycle-reminder-wrap">
        <span>检验周期：</span>
        <a-range-picker
          v-model:value="inspectCycle"
          valueFormat="YYYY-MM-DD"
          format="YYYY-MM-DD"
          @change="onCycleReminderChange"
        />
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiUpdateToolDetail } from '@/service/api/storehouse'
import { message } from 'ant-design-vue'

const props = defineProps<{
  handleReacquire: Function
}>()

const visible = ref<boolean>(false)

const title = ref<string>('完成检验')

const detailInfo = reactive<any>({
  id: '',
  inspectStart: '',
  inspectEnd: '',
})

const inspectCycle = ref<string[]>([])

/**
 * @desc 初始化对话框
 */
const initModal = async (initInfo: any) => {
  const { id, inspectStart, inspectEnd } = initInfo
  Object.assign(detailInfo, { id, inspectStart, inspectEnd })
  inspectCycle.value = [inspectStart, inspectEnd]
  visible.value = true
}

/**
 * @desc 检验周期
 */
const onCycleReminderChange = (val: string[]) => {
  detailInfo.inspectStart = val[0]
  detailInfo.inspectEnd = val[1]
}

/**
 * @desc 确认操作
 */
const handleConfirm = async () => {
  const { code } = await apiUpdateToolDetail(detailInfo)
  if (code === 20000) {
    message.success('更新成功')
    props.handleReacquire()
    handleCancel()
  }
}

/**
 * @desc 取消操作
 */
const handleCancel = () => {
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.inspection-done-wrapper {
  .tip-wrap {
  }
  .cycle-reminder-wrap {
    display: flex;
    align-items: center;
    margin-top: 28px;
  }
}
</style>
