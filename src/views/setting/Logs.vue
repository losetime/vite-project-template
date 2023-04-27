<template>
  <div class="logs-wrapper">
    <div class="handle-wrap">
      <a-space>
        <a-button type="primary" @click="handleExportLogs">导出</a-button>
      </a-space>
      <a-space>
        <a-input v-model:value="searchParams.operName" placeholder="请输入操作人员" />
        <a-select
          v-model:value="searchParams.businessType"
          allowClear
          style="width: 160px"
          placeholder="请选择业务类型"
        >
          <a-select-option :value="1">新增</a-select-option>
          <a-select-option :value="2">修改</a-select-option>
          <a-select-option :value="3">删除</a-select-option>
          <a-select-option :value="0">其他</a-select-option>
        </a-select>
        <a-button type="primary" @click="handleRefresh">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </a-space>
    </div>
    <div class="table-wrap">
      <ym-table
        rowKey="roleId"
        :columns="logsColumns"
        :getTableList="getRoleList"
        :rowSelection="false"
        ref="tableInstance"
      >
        <template #businessType="{ record }">
          {{ formattBusinessType(record.businessType) }}
        </template>
        <template #action="{ record }">
          <a-space v-if="!record.admin">
            <a-button type="link" size="small" @click="handleCheck(record)">详情</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <logs-detail ref="detailInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import LogsDetail from '@/components/setting/LogsDetail.vue'
import { apiGetLogsList, apiExportLogs } from '@/service/api/setting'
import { logsColumns } from '@/columns/setting'

/**
 ********************************* 表格逻辑 ******************************************
 */

const searchParams = reactive({
  operName: '',
  businessType: null,
})

// 表格实例
const tableInstance = ref()

/**
 * @desc 列表刷新
 */
const handleRefresh = () => {
  tableInstance.value.handleRefresh()
}

/**
 * @desc 列表重置
 */
const handleReset = () => {
  searchParams.operName = ''
  searchParams.businessType = null
  handleRefresh()
}

/**
 * @desc 获取用户列表
 */
const getRoleList = async () => {
  const { current, size } = tableInstance.value.reqParams
  const { code, rows, total } = await apiGetLogsList({
    pageSize: size,
    pageNum: current,
    ...searchParams,
  })
  return Promise.resolve({
    code,
    data: {
      records: rows,
      total,
    },
  })
}

// 格式化业务类型
const formattBusinessType = (type: number) => {
  switch (type) {
    case 0:
      return '其他'
    case 1:
      return '新增'
    case 2:
      return '修改'
    case 3:
      return '删除'
  }
}

/**
 * @desc 导出日志
 */
const handleExportLogs = async () => {
  await apiExportLogs()
}

const detailInstance = ref()

/**
 * @desc 查看详情
 */
const handleCheck = (record: any) => {
  detailInstance.value.initModal(record)
}
</script>

<style lang="less" scoped>
.logs-wrapper {
  .handle-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
  }
}
</style>
