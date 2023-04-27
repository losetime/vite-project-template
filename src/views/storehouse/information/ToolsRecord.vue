<template>
  <div class="tools-list-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="工器具分类">
          <a-input v-model:value="searchParams.toolTag" placeholder="请输入工器具分类" />
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
        :columns="toolsRecordColumns"
        :getTableList="apiGetToolTypeList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { apiGetToolTypeList } from '@/service/api/storehouse'
import { toolsRecordColumns } from '@/columns/storehouse'
import useSectionCode from '@/hooks/useSectionCode'

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 搜索参数
const searchParams = reactive<any>({
  bidCode: '',
  toolTag: '',
  toolType: '',
  toolModel: '',
  other: 'toolType',
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
})

/**
 * @desc 重新获取列表
 */
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
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
</script>

<style lang="less" scoped>
.tools-list-wrapper {
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
  .custom-table-wrap {
    height: calc(100% - 170px);
    padding: 32px;
    margin-top: 20px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
