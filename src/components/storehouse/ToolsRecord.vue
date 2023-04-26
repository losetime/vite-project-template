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
        :columns="checkToolsRecordColumns"
        :getTableList="apiGetToolDetailRecord"
        :is-immediately="false"
        :pagination="false"
        :row-selection="false"
        :params="searchParams"
        ref="tableInstance"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive } from 'vue'
import { checkToolsRecordColumns } from '@/enums/tableHeadEnum'
import { apiGetToolDetailRecord } from '@/service/api/storehouse'
import YmTable from '@/components/common/YmTable.vue'

const visible = ref<boolean>(false)

const title = ref<string>('查看工器具')

const tableInstance = ref<any>(null)

const searchParams = reactive({
  companyCode: '',
  model: '',
  tag: '',
  type: '',
})

/**
 * @desc 初始化对话框
 */
const initModal = async (initInfo: any) => {
  visible.value = true
  searchParams.companyCode = initInfo.toolCompanyCode
  searchParams.model = initInfo.toolModelCode
  searchParams.tag = initInfo.toolTagCode
  searchParams.type = initInfo.toolTypeCode
  nextTick(() => {
    tableInstance.value.handleReacquire(1)
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
