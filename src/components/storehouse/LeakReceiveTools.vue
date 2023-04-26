<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="800px"
  >
    <div class="table-wrap">
      <ym-table
        rowKey="id"
        :columns="LeakReceiveToolsColumns"
        :getTableList="getTableList"
        :is-immediately="false"
        :pagination="false"
        ref="tableInstance"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { LeakReceiveToolsColumns } from '@/enums/tableHeadEnum'

const props = defineProps<{
  leakReceiveData: any[]
}>()

const visible = ref<boolean>(false)

const title = ref<string>('漏领工器具')

const tableInstance = ref<any>(null)

/**
 * @desc 初始化对话框
 */
const initModal = async () => {
  visible.value = true
  nextTick(() => {
    tableInstance.value.handleReacquire()
  })
}

/**
 * @desc 包装数据
 */
const getTableList = () => {
  return new Promise((reslove) => {
    reslove({
      code: 20000,
      data: props.leakReceiveData,
    })
  })
}

/**
 * @desc 确认操作
 */
const handleConfirm = () => {
  handleCancel()
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
.table-wrap {
  height: 400px;
  overflow-y: auto;
}
</style>
