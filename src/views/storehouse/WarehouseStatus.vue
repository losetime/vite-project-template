<template>
  <div class="warehouse-status-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="仓位名称">
          <a-input v-model:value="searchParams.name" placeholder="请输入仓位名称" />
        </a-form-item>
        <a-form-item label="设备在库率">
          <a-input v-model:value="searchParams.existRate" placeholder="请输入设备在库率" />
        </a-form-item>
        <a-form-item label="类型">
          <a-input v-model:value="searchParams.toolType" placeholder="请输入类型" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="videos-wrap">
      <div
        class="video-item"
        v-for="(item, index) in toolShippingSpaceRecord"
        :key="index"
        :style="{
          backgroundColor:
            item.existRate === 0 ? '#ffe3dc' : item.existRate <= 0.25 && item.existRate >= 0.01 ? '#fff8e8' : '#eff6ff',
        }"
      >
        <div class="header-wrap">
          <span class="warehouse-type">仓位类型：{{ item.typesStr }}</span>
          <span
            :class="{ 'warehouse-status_offline': item.status === '0', 'warehouse-status_online': item.status === '1' }"
            >{{ item.status === '0' ? '离线' : '在线' }}</span
          >
        </div>
        <div class="body-wrap" @click="handleCheck(item)">{{ item.name }}</div>
        <div class="footer-wrap">设备在线率：{{ item.existRate * 100 }}%</div>
      </div>
    </div>
    <div class="legend-wrap">
      <div class="legend-item">
        <span class="legend-block" style="background: #eff6ff"></span>
        <span>100%-25%</span>
      </div>
      <div class="legend-item">
        <span class="legend-block" style="background: #fff8e8"></span>
        <span>25%-1%</span>
      </div>
      <div class="legend-item">
        <span class="legend-block" style="background: #ffe3dc"></span>
        <span>0%</span>
      </div>
    </div>
    <RepositoryPositionDetail ref="repositoryPositionDetailInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import RepositoryPositionDetail from '@/components/storehouse/RepositoryPositionDetail.vue'
import { apiGetToolShippingSpaceRecord } from '@/service/api/storehouse'
import useSectionCode from '@/hooks/useSectionCode'

const toolShippingSpaceRecord = ref<any[]>([])

// 搜索参数
const searchParams = reactive({
  bidCode: '',
  name: '',
  existRate: '',
  toolType: '',
  size: 1000,
  current: 1,
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  getToolShippingSpaceRecord()
})

/**
 * @desc 查询
 */
const handleSearch = () => {
  getToolShippingSpaceRecord()
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    name: '',
    existRate: '',
    toolType: '',
  })
  handleSearch()
}

/**
 * @desc 获取仓位列表
 */
const getToolShippingSpaceRecord = async () => {
  const { code, data } = await apiGetToolShippingSpaceRecord({
    ...searchParams,
    existRate: searchParams.existRate ? parseInt(searchParams.existRate) / 100 : '',
  })
  if (code === 20000) {
    toolShippingSpaceRecord.value = data.records
  }
}

const repositoryPositionDetailInstance = ref<any>(null)

/**
 * @desc 查看仓位详情
 */
const handleCheck = (record: any) => {
  repositoryPositionDetailInstance.value.initModal(record.id)
}
</script>

<style lang="less" scoped>
.warehouse-status-wrapper {
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
  .videos-wrap {
    height: calc(100% - 220px);
    padding: 32px;
    margin-top: 20px;
    background-color: #ffffff;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 320px);
    grid-template-rows: repeat(auto-fill, 166px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    .video-item {
      width: 320px;
      height: 166px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 21px 16px;
      .header-wrap {
        display: flex;
        justify-content: space-between;
        .warehouse-type {
          color: #666666;
          font-size: 12px;
        }
        .warehouse-status_offline {
          color: #ff676b;
          font-size: 12px;
        }
        .warehouse-status_online {
          color: #74c041;
          font-size: 12px;
        }
      }
      .body-wrap {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: 24px;
        cursor: pointer;
      }
      .footer-wrap {
        display: flex;
        justify-content: flex-end;
        color: #666666;
        font-size: 12px;
      }
    }
  }
  .legend-wrap {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    .legend-item {
      display: flex;
      align-items: center;
      margin-left: 32px;
      .legend-block {
        display: inline-block;
        width: 32px;
        height: 20px;
        border-radius: 4px;
        margin-right: 8px;
      }
    }
  }
}
</style>
