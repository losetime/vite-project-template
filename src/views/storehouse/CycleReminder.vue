<template>
  <div class="cycle-reminder-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="工器具分类">
          <a-select v-model:value="searchParams.toolTag" placeholder="请选择工器具分类" @change="getToolsName">
            <a-select-option v-for="item in toolsTypeOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="工器具名称">
          <a-select v-model:value="searchParams.toolType" placeholder="请选择工器具名称" @change="getToolsModel">
            <a-select-option v-for="item in toolsNameOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="工器具型号">
          <a-select v-model:value="searchParams.model" placeholder="请选择工器具型号">
            <a-select-option v-for="item in toolsModelOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="待检状态">
          <a-select v-model:value="searchParams.checkStatus" placeholder="请选择待检状态">
            <a-select-option value="1">待检</a-select-option>
            <a-select-option value="2">已脱检</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="距离脱检时间段">
          <a-input-number v-model:value="searchParams.nearCheckDays" :min="1" :max="45" placeholder="请输入1-45天" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="searchParams.status" placeholder="请选择状态" :options="toolStatusOptions" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="handle-wrap">
      <a-button type="primary" @click="checkExpired">只看脱检设备</a-button>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="cycleReminderColumns"
        :getTableList="apiGetTagsList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #slotOne="{ record }">
          {{ record.errorStatusStr ? record.errorStatusStr : toolStatusEnum(record.status) }}
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
            <a-button type="link" size="small" @click="handleInspectionDone(record)" v-if="record.restOfDCheckDay < 0">
              完成检验
            </a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <tag-read-in-detail
      :handleReacquire="handleReacquire"
      :toolsTypeOptions="toolsTypeOptions || []"
      ref="detailInstance"
    />
    <inspection-done :handleReacquire="handleReacquire" ref="inspectionDoneInstance" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import TagReadInDetail from '@/components/storehouse/TagReadInDetail.vue'
import InspectionDone from '@/components/storehouse/InspectionDone.vue'
import { apiGetTagsList } from '@/service/api/storehouse'
import { apiGetDicts, apiGetDictChildren, apiSetMsgHaveRead } from '@/service/api/common'
import { cycleReminderColumns } from '@/enums/tableHeadEnum'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'
import { toolStatusEnum, toolStatusOptions } from '@/enums/storehouseEnum'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 工器具分类
const toolsTypeOptions = ref()

// 工器具名称
const toolsNameOptions = ref<any[]>([])

// 工器具型号
const toolsModelOptions = ref<any[]>([])

// 搜索参数
const searchParams = reactive<any>({
  bidCode: '',
  toolTag: null,
  toolType: null,
  model: null,
  status: null,
  nearCheckDays: '',
  checkStatus: null,
  other: 'accountList',
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  getToolsType()
  handleReacquire(1)
})

const cycleReminderNum = computed(() => appStore.cycleReminderNum)

onMounted(() => {
  if (cycleReminderNum.value > 0) {
    setMsgHaveRead()
  }
})

/**
 * @desc 重新获取列表
 */
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

/**
 * @desc 只看脱检设备
 */
const checkExpired = () => {
  searchParams.checkStatus = '2'
  handleReacquire(1)
}

/**
 * @desc 获取工器具类别
 */
const getToolsType = async () => {
  const { code, data } = await apiGetDicts({ types: 'toolTag' })
  if (code === 20000) {
    toolsTypeOptions.value = data.toolTag
  }
}

/**
 * @desc 获取工器具名称
 */
const getToolsName = async (value: string) => {
  const { code, data } = await apiGetDictChildren({ type: 'toolTag', value })
  if (code === 20000) {
    toolsNameOptions.value = data
    searchParams.toolType = null
    searchParams.model = null
    toolsModelOptions.value = []
  }
}

/**
 * @desc 获取工器具型号
 */
const getToolsModel = async (value: string) => {
  const { code, data } = await apiGetDictChildren({ type: 'toolType', value })
  if (code === 20000) {
    toolsModelOptions.value = data
    searchParams.model = null
  }
}

/**
 * @desc 设置周期提醒已读
 */
const setMsgHaveRead = async () => {
  const { code, data } = await apiSetMsgHaveRead({ dataType: 'today_overCheckNum' })
  if (code === 20000) {
    appStore.cycleReminderNum = parseInt(data)
  }
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    toolTag: null,
    toolType: null,
    model: null,
    status: null,
    nearCheckDays: '',
    checkStatus: null,
  })
  toolsNameOptions.value = []
  toolsModelOptions.value = []
  handleReacquire(1)
}

/**
 * @desc 下载
 */
// const handleDownload = () => {}

/**
 ********************************* 详情操作 ******************************************
 */

const detailInstance = ref()

/**
 * @desc 查看
 */
const handleCheck = async (record: any) => {
  detailInstance.value.initModal(actionTypeEnum.CHECK, record)
}

const inspectionDoneInstance = ref()

/**
 * @desc 完成检验
 */
const handleInspectionDone = async (record: any) => {
  inspectionDoneInstance.value.initModal(record)
}
</script>

<style lang="less" scoped>
.cycle-reminder-wrapper {
  height: 100%;
  .search-wrap {
    padding: 32px;
    background-color: #ffffff;
    ::v-deep(.ant-form) {
      display: grid;
      grid-template-columns: repeat(3, 26%);
      grid-row-gap: 20px;
      grid-column-gap: 30px;
      .ant-form-item-label {
        width: 110px;
      }
      .ant-picker {
        width: 100%;
      }
      .ant-input-number {
        width: 100%;
      }
    }
  }
  .handle-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    padding: 32px 32px 20px 32px !important;
  }
  .custom-table-wrap {
    height: calc(100% - 306px);
    padding: 0 32px 32px 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
