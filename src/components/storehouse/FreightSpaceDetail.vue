<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol">
      <a-form-item label="仓位名称" v-bind="validateInfos.name">
        <a-input v-model:value="detailInfo.name" placeholder="请输入仓位名称" />
      </a-form-item>
      <a-form-item label="所属仓库" v-bind="validateInfos.houseId">
        <a-select v-model:value="detailInfo.houseId" placeholder="请选择所属仓库">
          <a-select-option v-for="item in repositoryAll" :value="item.id" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="对应型号" v-bind="validateInfos.models">
        <a-tree-select
          v-model:value="detailInfo.models"
          :field-names="fieldNames"
          style="width: 100%"
          placeholder="请选择对应型号"
          allow-clear
          multiple
          tree-default-expand-all
          :tree-data="toolsTree"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { apiGetRepositoryAll, apiSaveFreightSpace, apiGetToolsTree } from '@/service/api/storehouse'
import { freightSpaceDetailRules } from '@/validator/storehouse'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'

const props = defineProps<{
  handleReacquire: Function
}>()

const fieldNames = ref({
  title: 'label',
  value: 'id',
})

const labelCol = { span: 4 }

const handleType = ref<number>(actionTypeEnum.ADD)

const visible = ref<boolean>(false)

const title = ref<string>('新增仓位')

const detailInfo = reactive<any>({
  name: '',
  houseId: null,
  models: [],
  id: null,
})

const toolsTree = ref<any[]>([])

const repositoryAll = ref()

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, freightSpaceDetailRules)

const { sectionCode } = useSectionCode()

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  handleType.value = type
  getRepositoryAll()
  getToolsTree()
  if (type === actionTypeEnum.EDIT) {
    title.value = '编辑仓位'
    const { name, houseId, models, id } = initInfo
    Object.assign(detailInfo, {
      name,
      houseId,
      models: models ? models.split(',').map((item: string) => parseInt(item)) : [],
      id,
    })
  }
  visible.value = true
}

/**
 * @desc 获取所有仓库
 */
const getRepositoryAll = async () => {
  const { code, data } = await apiGetRepositoryAll()
  if (code === 20000) {
    repositoryAll.value = data
  }
}

/**
 * @desc 获取工器具树结构
 */
const getToolsTree = async () => {
  const { code, data } = await apiGetToolsTree()
  if (code === 20000) {
    toolsTree.value = data
  }
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
      const { name, houseId, models, id } = detailInfo
      let params: any = {
        name,
        houseId,
        bidNo: sectionCode.value,
      }
      if (models.length > 0) {
        params = { ...params, models: models.join(',') }
      }
      switch (handleType.value) {
        case actionTypeEnum.ADD:
          apiSaveFreightSpace(params).then((res: any) => {
            if (res.code === 20000) {
              props.handleReacquire(1)
              message.success('新增成功')
              handleCancel()
            }
          })
        case actionTypeEnum.EDIT:
          apiSaveFreightSpace({ ...params, id }).then((res: any) => {
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
  title.value = '新增仓位'
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
