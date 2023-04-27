<template>
  <div class="tools-account-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="工器具分类">
          <a-select
            v-model:value="searchParams.toolTag"
            placeholder="请选择工器具分类"
            allowClear
            @change="getToolsName"
          >
            <a-select-option v-for="item in toolsTypeOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="工器具名称">
          <a-select
            v-model:value="searchParams.toolType"
            placeholder="请选择工器具名称"
            show-search
            allowClear
            :options="toolsNameOptions"
            :filter-option="filterOption"
            :getPopupContainer="getPopupContainer"
            @change="getToolsModel"
          />
        </a-form-item>
        <a-form-item label="工器具型号">
          <a-select v-model:value="searchParams.model" placeholder="请选择工器具型号" allowClear>
            <a-select-option v-for="item in toolsModelOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="searchParams.status"
            placeholder="请选择状态"
            :options="toolStatusOptions"
            allowClear
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="toolsAccountColumns"
        :getTableList="apiGetTagsList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #status="{ record }">
          {{ record.errorStatusStr ? record.errorStatusStr : toolStatusEnum(record.status) }}
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <tag-read-in-detail
      :handleReacquire="handleReacquire"
      :toolsTypeOptions="toolsTypeOptions || []"
      ref="detailInstance"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import TagReadInDetail from '@/components/storehouse/TagReadInDetail.vue'
import { apiGetTagsList } from '@/service/api/storehouse'
import { apiGetDicts, apiGetDictChildren } from '@/service/api/common'
import { toolsAccountColumns } from '@/enums/tableHeadEnum'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'
import { toolStatusEnum, toolStatusOptions } from '@/enums/storehouseEnum'
import useSelect from '@/hooks/useSelect'

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
const searchParams = reactive({
  bidCode: '',
  toolTag: null,
  toolType: null,
  model: null,
  status: null,
  other: 'accountList',
})

const { filterOption, getPopupContainer } = useSelect()

useSectionCode((code: string) => {
  searchParams.bidCode = code
  getToolsType()
  handleReacquire(1)
})

/**
 * @desc 重新获取列表
 */
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
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
  if (!value) {
    toolsNameOptions.value = []
    searchParams.toolType = null
    searchParams.model = null
    toolsModelOptions.value = []
    return
  }
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
  if (!value) {
    toolsModelOptions.value = []
    searchParams.model = null
    return
  }
  const { code, data } = await apiGetDictChildren({ type: 'toolType', value })
  if (code === 20000) {
    toolsModelOptions.value = data
    searchParams.model = null
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
const handleCheck = (record: any) => {
  detailInstance.value.initModal(actionTypeEnum.CHECK, record)
}
</script>

<style lang="less" scoped>
.tools-account-wrapper {
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
        width: 80px;
      }
    }
  }
  .custom-table-wrap {
    height: calc(100% - 170px);
    padding: 32px;
    background-color: #ffffff;
    position: relative;
    margin-top: 20px;
  }
}
</style>
