<template>
  <div class="warehouse-check-wrapper">
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
    <div class="empty-wrap" v-if="isEmpty">
      <a-button type="primary" @click="handleOpenModal">导入工器具清单</a-button>
    </div>
    <div class="handle-wrap" v-else>
      <a-space>
        <a-button type="primary" @click="handleOpenModal">导入工器具清单</a-button>
        <a-button type="primary" @click="handlePutInStorage">一键入库</a-button>
      </a-space>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="warehouseCheckColumns"
        :getTableList="apiGetToolTypeList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <ToolsRecord ref="toolsRecordInstance" />
    <ImportToolManifest ref="importToolManifestIntance" :handleReacquire="handleReacquire" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { apiGetToolTypeList, apiPutInWarehousing } from '@/service/api/storehouse'
import { warehouseCheckColumns } from '@/columns/storehouse'
import useSectionCode from '@/hooks/useSectionCode'
import ToolsRecord from '@/components/storehouse/ToolsRecord.vue'
import { message } from 'ant-design-vue'
import ImportToolManifest from '@/components/storehouse/ImportToolManifest.vue'

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
  other: 'stockList',
  bidCode: '',
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
})

const isEmpty = computed(() => {
  if (tableInstance.value) {
    if (tableInstance.value.tableData.result.length > 0) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
})

/**
 * @desc 一键入库
 */
const handlePutInStorage = async () => {
  const { code } = await apiPutInWarehousing()
  if (code === 20000) {
    message.success('入库成功')
    handleReacquire(1)
  }
}

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
 * @desc 查看工器具详情列表
 */
const handleCheck = (record: any) => {
  toolsRecordInstance.value.initModal(record)
}

/**
 ********************************* 导入工器具清单 ******************************************
 */

const importToolManifestIntance = ref<any>(null)

const handleOpenModal = () => {
  importToolManifestIntance.value.initModal()
}
</script>

<style lang="less" scoped>
.warehouse-check-wrapper {
  height: 100%;
  position: relative;
  .search-wrap {
    padding: 32px;
    background-color: #ffffff;
    margin-bottom: 20px;
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
    width: 100%;
    height: calc(100% - 170px);
    padding: 32px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 100;
  }
  .handle-wrap {
    display: flex;
    justify-content: flex-end;
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
