<template>
  <div class="repository-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="仓库编号">
          <a-input v-model:value="searchParams.codeNum" placeholder="请输入仓库编号" />
        </a-form-item>
        <a-form-item label="仓库名称">
          <a-input v-model:value="searchParams.name" placeholder="请输入仓库名称" />
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
        <a-button type="primary" @click="handleAdd">新增</a-button>
        <a-button danger @click="handleDelete" :disabled="selectedRowKeys.length <= 0">删除</a-button>
      </a-space>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="repositoryColumns"
        :getTableList="apiGetRepositoryList"
        :params="searchParams"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
            <!-- <a-button type="link" size="small" @click="handleSwitch(record)" v-if="record.status === '0'"
              >启用</a-button
            >
            <a-button type="link" size="small" danger @click="handleSwitch(record)" v-else>禁用</a-button> -->
          </a-space>
        </template>
      </ym-table>
    </div>
    <repository-detail :handleReacquire="handleReacquire" ref="repositoryDetailInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import RepositoryDetail from '@/components/storehouse/RepositoryDetail.vue'
import { apiGetRepositoryList, apiDeleteRepository } from '@/service/api/storehouse'
import { repositoryColumns } from '@/enums/tableHeadEnum'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'
import { YmModal } from '@/utils/antd'
import { message } from 'ant-design-vue'

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 搜索参数
const searchParams = reactive({
  codeNum: '',
  name: '',
  bidCode: '',
})

const selectedRowKeys = computed(() => (tableInstance.value ? tableInstance.value.selectedRowKeys : []))

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
})

/**
 * @desc 刷新
 */
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    codeNum: '',
    name: '',
  })
  handleReacquire(1)
}

/**
 * @desc 列表删除
 */
const handleDelete = () => {
  YmModal.delete(async () => {
    const { code } = await apiDeleteRepository({ ids: selectedRowKeys.value.join(',') })
    if (code === 20000) {
      message.success('删除成功')
      handleReacquire()
    }
  })
}

/**
 ********************************* 详情操作 ******************************************
 */

const repositoryDetailInstance = ref()

/**
 * @desc 新增
 */
const handleAdd = () => {
  repositoryDetailInstance.value.initModal(actionTypeEnum.ADD)
}

/**
 * @desc 编辑
 */
const handleEdit = (record: any) => {
  repositoryDetailInstance.value.initModal(actionTypeEnum.EDIT, record)
}

// /**
//  * @desc 禁用/启用
//  */
// const handleSwitch = async (record: any) => {
//   const { status } = record
//   const { code } = await apiSaveRepository({ ...record, status: status === '0' ? '1' : '0' })
//   if (code === 20000) {
//     handleReacquire()
//   }
// }
</script>

<style lang="less" scoped>
.repository-wrapper {
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
  .handle-wrap {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 20px 32px;
    background-color: #ffffff;
    margin-top: 20px;
  }
  .custom-table-wrap {
    height: calc(100% - 200px);
    padding: 0 32px 32px 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
