<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    :confirm-loading="confirmLoading"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol">
      <div>
        <a-form-item label="工器具分类" v-bind="validateInfos.toolTag">
          <a-select v-model:value="detailInfo.toolTag" placeholder="请选择工器具类型">
            <a-select-option v-for="item in toolTagOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择清单" required>
          <a-upload
            name="file"
            :file-list="fileList"
            :before-upload="beforeUpload"
            accept=".xlsx"
            :max-count="1"
            @remove="handleRemove"
          >
            <a-button type="primary">导入工器具清单</a-button>
          </a-upload>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ImportToolManifestRules } from '@/validator/storehouse'
import { Form, message } from 'ant-design-vue'
import { apiUploadToolManifest } from '@/service/api/storehouse'
import { apiGetDicts } from '@/service/api/common'

const props = defineProps<{
  handleReacquire: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('导入工器具清单')

const detailInfo = reactive<any>({
  toolTag: null,
})

const fileList = ref<any[]>([])

const toolTagOptions = ref<any[]>([])

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, ImportToolManifestRules)

/**
 * @desc 初始化对话框
 */
const initModal = async () => {
  getDicts()
  visible.value = true
}

const getDicts = async () => {
  const { code, data } = await apiGetDicts({ types: 'toolTag' })
  if (code === 20000) {
    toolTagOptions.value = data.toolTag
  }
}

const beforeUpload = (file: any) => {
  fileList.value = [file]
  return false
}

const handleRemove = (file: any) => {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}

// 确认loading
const confirmLoading = ref(false)

/**
 * @desc 确认操作
 */
const handleConfirm = () => {
  validate()
    .then(async () => {
      if (fileList.value.length <= 0) {
        message.warning('请选择文件')
        return
      }
      if (fileList.value.length > 1) {
        message.warning('只能上传一个文件')
        return
      }
      confirmLoading.value = true
      const { code } = await apiUploadToolManifest({ file: fileList.value[0], toolTag: detailInfo.toolTag })
      confirmLoading.value = false
      if (code === 20000) {
        message.success('上传成功')
        props.handleReacquire(1)
        handleCancel()
      }
    })
    .catch((e: any) => {
      console.log(e)
    })
}

/**
 * @desc 取消操作
 */
const handleCancel = () => {
  fileList.value = []
  resetFields()
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
