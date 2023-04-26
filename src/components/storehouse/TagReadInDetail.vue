<template>
  <a-modal v-model:visible="visible" :title="title" :destroyOnClose="true" :afterClose="handleCancel" width="800px">
    <a-form :label-col="labelCol" labelAlign="right" :hideRequiredMark="true">
      <a-row>
        <a-col :span="11">
          <a-form-item label="工器具分类" v-bind="validateInfos.toolTag">
            <a-select
              v-model:value="detailInfo.toolTag"
              placeholder="请选择工器具分类"
              @change="onToolTagChange"
              :disabled="isCheck"
            >
              <a-select-option v-for="item in toolsTypeOptions" :value="item.value" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="工器具型号" v-bind="validateInfos.model">
            <a-select
              v-model:value="detailInfo.model"
              placeholder="请选择工器具型号"
              @change="onModelChange"
              :disabled="isCheck"
            >
              <a-select-option v-for="item in toolsModelOptions" :value="item.value" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="单位" v-bind="validateInfos.meter">
            <a-select v-model:value="detailInfo.meter" placeholder="请选择单位" :disabled="isCheck">
              <a-select-option v-for="item in unitOptions" :value="item.value" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="生产日期" v-bind="validateInfos.manufactureDate">
            <a-date-picker
              v-model:value="detailInfo.manufactureDate"
              valueFormat="YYYY-MM-DD"
              placeholder="请选择生产日期"
              :disabled="isCheck"
            />
          </a-form-item>
          <a-form-item label="检验周期" v-bind="validateInfos.inspectCycle">
            <a-range-picker
              v-model:value="detailInfo.inspectCycle"
              valueFormat="YYYY-MM-DD"
              separator="至"
              :disabled="isCheck"
            />
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="工器具名称" v-bind="validateInfos.toolType">
            <a-select
              v-model:value="detailInfo.toolType"
              placeholder="请选择工器具名称"
              @change="onToolTypeChange"
              :disabled="isCheck"
            >
              <a-select-option v-for="item in toolsNameOptions" :value="item.value" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="FRID编码" v-bind="validateInfos.epc">
            <a-input
              v-model:value="detailInfo.epc"
              placeholder="点击生成FRID编码"
              readOnly
              @click="generateFRID"
              :disabled="isCheck"
            />
          </a-form-item>
          <a-form-item label="生产厂家" v-bind="validateInfos.manufacturer">
            <a-input v-model:value="detailInfo.manufacturer" placeholder="请输入生产厂家" :disabled="isCheck" />
          </a-form-item>
          <a-form-item label="购置日期" v-bind="validateInfos.buyDate">
            <a-date-picker
              v-model:value="detailInfo.buyDate"
              valueFormat="YYYY-MM-DD"
              placeholder="请选择购置日期"
              :disabled="isCheck"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleConfirm" v-show="!isCheck">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { TagReadInDetailRules } from '@/validator/storehouse'
import { actionTypeEnum } from '@/enums/commonEnum'
import { Form, message } from 'ant-design-vue'
import { apiSaveTag, apiGenerateFRID } from '@/service/api/storehouse'
import { apiGetDicts, apiGetDictChildren } from '@/service/api/common'
import useSectionCode from '@/hooks/useSectionCode'
import { dateUtil } from '@/utils/dateUtil'

const props = defineProps<{
  handleReacquire: Function
  toolsTypeOptions: any[]
}>()

const labelCol = { span: 7 }

const visible = ref<boolean>(false)

const title = ref<string>('设备信息')

const detailInfo = reactive<any>({
  toolTag: null,
  model: null,
  meter: null,
  manufactureDate: '',
  inspectCycle: [],
  toolType: null,
  epc: '',
  manufacturer: '',
  buyDate: '',
})

const unitOptions = ref<any[]>([])

// 工器具名称
const toolsNameOptions = ref<any[]>([])

// 工器具型号
const toolsModelOptions = ref<any[]>([])

const handleType = ref<number>(actionTypeEnum.ADD)

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, TagReadInDetailRules)

const isEdit = computed(() => handleType.value === actionTypeEnum.EDIT)

const isCheck = computed(() => handleType.value === actionTypeEnum.CHECK)

const { sectionCode } = useSectionCode()

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  getToolMeter()
  handleType.value = type
  if (isEdit.value || isCheck.value) {
    console.log(initInfo)
    const {
      toolTag,
      model,
      meter,
      manufactureDate,
      inspectStart,
      inspectEnd,
      toolType,
      epc,
      manufacturer,
      buyDate,
      id,
    } = initInfo
    getToolsName(toolTag)
    getToolsModel(toolType)
    Object.assign(detailInfo, {
      id,
      toolTag,
      model,
      meter,
      manufactureDate,
      inspectCycle: [inspectStart, inspectEnd],
      toolType,
      epc,
      manufacturer,
      buyDate,
    })
  }
  visible.value = true
}

/**
 * @desc 获取工器具计量单位
 */
const getToolMeter = async () => {
  const { code, data } = await apiGetDicts({ types: 'toolMeter' })
  if (code === 20000) {
    unitOptions.value = data.toolMeter
  }
}

const onToolTagChange = (value: string) => {
  toolsModelOptions.value = []
  detailInfo.model = null
  detailInfo.toolType = null
  detailInfo.epc = ''
  getToolsName(value)
}

/**
 * @desc 获取工器具名称
 */
const getToolsName = async (value: string) => {
  const { code, data } = await apiGetDictChildren({ type: 'toolTag', value })
  if (code === 20000) {
    toolsNameOptions.value = data
  }
}

const onToolTypeChange = (value: string) => {
  detailInfo.model = null
  detailInfo.epc = ''
  getToolsModel(value)
}

/**
 * @desc 获取工器具型号
 */
const getToolsModel = async (value: string) => {
  const { code, data } = await apiGetDictChildren({ type: 'toolType', value })
  if (code === 20000) {
    toolsModelOptions.value = data
  }
}

const onModelChange = () => {
  detailInfo.epc = ''
}

/**
 * @desc 生成FRID
 */
const generateFRID = async () => {
  const { toolTag, toolType, model } = detailInfo
  if (toolTag && toolType && model) {
    const { code, data } = await apiGenerateFRID({
      model: model,
      tag: toolTag,
      type: toolType,
    })
    if (code === 20000) {
      detailInfo.epc = data
    }
  } else {
    message.warning('请选择工器具分类，工器具名称和工器具型号')
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
      const { manufactureDate, buyDate, inspectCycle } = detailInfo
      console.log(manufactureDate, buyDate, inspectCycle)
      if (dateUtil().isBefore(dateUtil(manufactureDate))) {
        message.warning('生产日期不能早于当前时间')
        return
      }
      if (dateUtil(manufactureDate).isAfter(dateUtil(buyDate))) {
        message.warning('购置日期不能早于生产日期')
        return
      }
      if (dateUtil(buyDate).isAfter(dateUtil(inspectCycle[0]))) {
        message.warning('检验周期开始时间不能早于购置日期')
        return
      }
      confirmLoading.value = true
      const parmas = {
        bidNo: sectionCode.value,
        ...detailInfo,
        inspectStart: inspectCycle[0],
        inspectEnd: inspectCycle[1],
      }
      const { code } = await apiSaveTag(parmas)
      confirmLoading.value = false
      if (code === 20000) {
        switch (handleType.value) {
          case actionTypeEnum.ADD:
            message.success('新增成功')
            props.handleReacquire(1)
            break
          case actionTypeEnum.EDIT:
            message.success('更新成功')
            props.handleReacquire()
            break
        }
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
  resetFields()
  toolsNameOptions.value = []
  toolsModelOptions.value = []
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.ant-form {
  .ant-row {
    display: flex;
    justify-content: space-between;
  }
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
