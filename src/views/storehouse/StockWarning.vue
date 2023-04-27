<template>
  <div class="stock-warning-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="工器具分类">
          <a-input v-model:value="searchParams.toolTag" placeholder="请输入工器具类型" />
        </a-form-item>
        <a-form-item label="工器具名称">
          <a-input v-model:value="searchParams.toolType" placeholder="请输入工器具名称" />
        </a-form-item>
        <a-form-item label="工器具型号">
          <a-input v-model:value="searchParams.toolModel" placeholder="请输入工器具型号" />
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
        :columns="stockWarningColumns"
        :getTableList="apiGetToolTypeList"
        :params="searchParams"
        :isImmediately="false"
        ref="tableInstance"
      >
        <template #existNum="{ record }">
          <a-space>
            <span :style="{ color: record.existNum <= 0 ? '#ff4d4f' : '' }">{{ record.existNum }}</span>
            <span style="background: #ff4d4f; color: #ffffff; padding: 2px 4px" v-if="record.existNum <= 0">
              库存不足
            </span>
          </a-space>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <ToolsRecord ref="toolsRecordInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { apiGetToolTypeList } from '@/service/api/storehouse'
import { stockWarningColumns } from '@/enums/tableHeadEnum'
import useSectionCode from '@/hooks/useSectionCode'
import ToolsRecord from '@/components/storehouse/ToolsRecord.vue'

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref<any>(null)

// 搜索参数
const searchParams = reactive({
  toolTag: '',
  toolType: '',
  toolModel: '',
  other: 'stockWarn',
  bidCode: '',
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
})

/**
 * @desc 刷新
 */
const handleReacquire = (page?: number) => {
  tableInstance.value?.handleReacquire(page)
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    toolTag: '',
    toolType: '',
    toolModel: '',
  })
  handleReacquire(1)
}

/**
 ********************************* 详情操作 ******************************************
 */

const toolsRecordInstance = ref()

/**
 * @desc 查看视频
 */
const handleCheck = (record: any) => {
  toolsRecordInstance.value.initModal(record)
}
</script>

<style lang="less" scoped>
.stock-warning-wrapper {
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
      .ant-picker {
        width: 100%;
      }
    }
  }
  .empty-wrap {
    height: calc(100% - 170px);
    margin-top: 20px;
    padding: 32px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .handle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 32px 32px 20px 32px !important;
    background-color: #ffffff;
  }
  .custom-table-wrap {
    height: calc(100% - 254px);
    padding: 0 32px 32px 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
