<template>
  <div class="tag-read-in-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="工器具分类">
          <a-select v-model:value="searchParams.toolTag" placeholder="请选择工器具分类" @change="getToolsName">
            <a-select-option v-for="item in toolsTypeOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
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
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="handle-wrap">
      <a-space>
        <a-button type="primary" @click="handleAdd">新增工器具</a-button>
        <!-- <a-button @click="handleDownload">批量导入</a-button>
        <a-button @click="handleDownload">下载</a-button> -->
        <a-button danger @click="handleDelete" :disabled="selectedRowKeys.length <= 0">删除</a-button>
      </a-space>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="tagReadInColumns"
        :getTableList="apiGetTagsList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
            <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <tag-read-in-detail
      :handleReacquire="handleReacquire"
      :toolsTypeOptions="toolsTypeOptions || []"
      :toolsNameOptions="toolsNameOptions || []"
      :toolsModelOptions="toolsModelOptions || []"
      :getToolsName="getToolsName"
      :getToolsModel="getToolsModel"
      ref="detailInstance"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import TagReadInDetail from '@/components/storehouse/TagReadInDetail.vue'
import { apiGetTagsList, apiDeleteTags } from '@/service/api/storehouse'
import { apiGetDicts, apiGetDictChildren } from '@/service/api/common'
import { tagReadInColumns } from '@/enums/tableHeadEnum'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'
import { YmModal } from '@/utils/antd'
import { message } from 'ant-design-vue'

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
  other: 'epcWriteList',
})

const selectedRowKeys = computed(() => (tableInstance.value ? tableInstance.value.selectedRowKeys : []))

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
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    toolTag: null,
    toolType: null,
    model: null,
  })
  toolsNameOptions.value = []
  toolsModelOptions.value = []
  handleReacquire(1)
}

/**
 * @desc 列表删除
 */
const handleDelete = () => {
  YmModal.delete(async () => {
    const { code } = await apiDeleteTags({ ids: selectedRowKeys.value.join(',') })
    if (code === 20000) {
      message.success('删除成功')
      handleReacquire()
    }
  })
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
 * @desc 新增
 */
const handleAdd = () => {
  detailInstance.value.initModal(actionTypeEnum.ADD)
}

/**
 * @desc 编辑
 */
const handleEdit = (record: any) => {
  detailInstance.value.initModal(actionTypeEnum.EDIT, record)
}

/**
 * @desc 查看
 */
const handleCheck = (record: any) => {
  detailInstance.value.initModal(actionTypeEnum.CHECK, record)
}
</script>

<style lang="less" scoped>
.tag-read-in-wrapper {
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
  .handle-wrap {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 16px 32px !important;
    background-color: #ffffff;
    margin-top: 20px;
  }
  .custom-table-wrap {
    height: calc(100% - 250px);
    padding: 0 32px 32px 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
