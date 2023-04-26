<template>
  <div class="freight-space-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="所属仓库">
          <a-select v-model:value="searchParams.houseId" placeholder="请选择所属仓库" :options="repositoryOptions" />
        </a-form-item>
        <a-form-item label="仓位">
          <a-input v-model:value="searchParams.name" placeholder="请输入仓位" />
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
    <div class="table-wrap">
      <ym-table
        rowKey="id"
        :columns="freightSpaceColumns"
        :getTableList="apiGetFreightSpaceList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #slotOne="{ record }">
          <span>{{ record.modelsStr }}</span>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <freight-space-detail :handleReacquire="handleReacquire" ref="detailInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import FreightSpaceDetail from '@/components/storehouse/FreightSpaceDetail.vue'
import { apiGetFreightSpaceList, apiDeleteFreightSpace, apiGetRepositoryAll } from '@/service/api/storehouse'
import { freightSpaceColumns } from '@/enums/tableHeadEnum'
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
  name: '',
  houseId: null,
  bidCode: '',
})

const repositoryOptions = ref<any[]>([])

const selectedRowKeys = computed(() => (tableInstance.value ? tableInstance.value.selectedRowKeys : []))

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
  getRepositoryAll()
})

/**
 * @desc 获取全部仓库
 */
const getRepositoryAll = async () => {
  const { code, data } = await apiGetRepositoryAll()
  if (code === 20000) {
    repositoryOptions.value = data.map((item: any) => ({ label: item.name, value: item.id }))
  }
}

/**
 * @desc 重新获取列表
 */
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

/**
 * @desc 列表删除
 */
const handleDelete = () => {
  YmModal.delete(async () => {
    const { code } = await apiDeleteFreightSpace({ ids: selectedRowKeys.value.join(',') })
    if (code === 20000) {
      message.success('删除成功')
      handleReacquire()
    }
  })
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    name: '',
    houseId: null,
  })
  handleReacquire(1)
}

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
 * @desc 禁用/启用
 */
// const handleSwitch = async (record: any) => {
//   const { status } = record
//   const { code } = await apiSaveFreightSpace({ ...record, status: status === '0' ? '1' : '0' })
//   if (code === 20000) {
//     handleReacquire()
//   }
// }
</script>

<style lang="less" scoped>
.freight-space-wrapper {
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
        width: 70px;
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
  .table-wrap {
    height: calc(100% - 200px);
    padding: 0 32px 32px 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
