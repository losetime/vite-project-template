<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol" labelAlign="left">
      <a-form-item label="设备名称">
        <a-input v-model:value="detailInfo.toolName" placeholder="请输入设备名称" disabled />
      </a-form-item>
      <a-form-item label="器具编号">
        <a-input v-model:value="detailInfo.codeNumber" placeholder="请输入器具编号" disabled />
      </a-form-item>
      <a-form-item label="领用人">
        <a-input v-model:value="detailInfo.recipientName" placeholder="请输入领用人" disabled />
      </a-form-item>
      <a-form-item label="领用时间">
        <a-date-picker
          show-time
          v-model:value="detailInfo.receiveTime"
          valueFormat="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择领用时间"
          disabled
        />
      </a-form-item>
      <a-form-item label="器具类别">
        <a-input v-model:value="detailInfo.toolTypeName" placeholder="请输入器具类别" disabled />
      </a-form-item>
      <a-form-item label="是否归还">
        <a-radio-group v-model:value="detailInfo.isReturn" disabled>
          <a-radio value="0">未归还</a-radio>
          <a-radio value="1">已归还</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('器具领用详情')

const detailInfo = reactive<any>({
  toolName: '',
  codeNumber: '',
  recipientName: '',
  receiveTime: '',
  toolTypeName: '',
  isReturn: '',
})

/**
 * @desc 初始化对话框
 */
const initModal = async (initInfo: any) => {
  Object.assign(detailInfo, initInfo)
  visible.value = true
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
.ant-form {
  .ant-form-item {
    ::v-deep(.ant-picker) {
      width: 100%;
    }
    ::v-deep(.ant-input-number) {
      width: 100%;
    }
  }
}
</style>
