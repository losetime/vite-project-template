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
        <a-form-item label="仓库名称" v-bind="validateInfos.name">
          <a-input v-model:value="detailInfo.name" placeholder="请输入仓库名称" />
        </a-form-item>
        <a-form-item label="仓库编码" v-bind="validateInfos.codeNum">
          <a-input v-model:value="detailInfo.codeNum" placeholder="请输入仓库编码" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { repositoryDetailRules } from '@/validator/storehouse'
import { actionTypeEnum } from '@/enums/commonEnum'
import { Form, message } from 'ant-design-vue'
import { apiSaveRepository } from '@/service/api/storehouse'
import useSectionCode from '@/hooks/useSectionCode'

const props = defineProps<{
  handleReacquire: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('新增仓库详情')

const detailInfo = reactive<any>({
  name: '',
  codeNum: '',
  id: null,
})

const handleType = ref<number>(actionTypeEnum.ADD)

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, repositoryDetailRules)

const isEdit = computed(() => handleType.value === actionTypeEnum.EDIT)

const { sectionCode } = useSectionCode()

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  handleType.value = type
  if (isEdit.value) {
    title.value = '编辑仓库详情'
    const { name, codeNum, id } = initInfo
    Object.assign(detailInfo, {
      name,
      codeNum,
      id,
    })
  }
  visible.value = true
}

// 确认loading
const confirmLoading = ref(false)

/**
 * @desc 确认操作
 */
const handleConfirm = () => {
  validate()
    .then(async () => {
      confirmLoading.value = true
      const { name, codeNum, id } = detailInfo
      switch (handleType.value) {
        case actionTypeEnum.ADD:
          apiSaveRepository({
            name,
            codeNum,
            bidNo: sectionCode.value,
          }).then((res: any) => {
            confirmLoading.value = false
            if (res.code === 20000) {
              props.handleReacquire(1)
              message.success('新增成功')
              handleCancel()
            }
          })
        case actionTypeEnum.EDIT:
          apiSaveRepository({
            name,
            codeNum,
            bidNo: sectionCode.value,
            id,
          }).then((res: any) => {
            confirmLoading.value = false
            if (res.code === 20000) {
              props.handleReacquire()
              message.success('更新成功')
              handleCancel()
            }
          })
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
  title.value = '新增仓库详情'
  visible.value = false
  resetFields()
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
