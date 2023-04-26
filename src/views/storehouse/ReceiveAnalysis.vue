<template>
  <div class="receive-analysis-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="领用日期">
          <a-date-picker v-model:value="searchParams.day" valueFormat="YYYY-MM-DD" placeholder="请选择领用日期" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="stats-info">
      <div class="stats-item">
        <p style="color: rgba(55, 121, 255, 1)" class="stats-value">{{ analysisStats.shouldTakeNum }}</p>
        <p class="stats-label">应领工器具类型总数</p>
      </div>
      <div class="stats-item">
        <p style="color: rgba(75, 180, 92, 1)" class="stats-value">{{ analysisStats.actualTakeNum }}</p>
        <p class="stats-label">当日领用工器具类型</p>
      </div>
      <div class="stats-item">
        <p style="color: rgba(251, 146, 22, 1)" class="stats-value">{{ analysisStats.missTakeNum }}</p>
        <p class="stats-label">漏领工器具类型数量</p>
        <!-- <a-button type="link" size="small" @click="handleCheckMissTakeNum">点击查看</a-button> -->
      </div>
      <div class="stats-item">
        <p style="color: rgba(255, 76, 80, 1)" class="stats-value">{{ analysisStats.planInfoNum }}</p>
        <p class="stats-label">当日工作计划</p>
      </div>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="id"
        :columns="receiveAnalysisColumns"
        :getTableList="apiGetToolTypeList"
        :params="searchParams"
        :isImmediately="false"
        ref="tableInstance"
      />
    </div>
    <div class="tip-info-wrap">
      <div class="title-wrap">当日工作信息</div>
      <div class="content-wrap">{{ workInfo }}</div>
    </div>
    <LeakReceiveTools ref="leakReceiveToolsInstance" :leakReceiveData="analysisStats.missToolList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { apiGetToolTypeList, apiGetAnalysisStats } from '@/service/api/storehouse'
import { receiveAnalysisColumns } from '@/enums/tableHeadEnum'
import useSectionCode from '@/hooks/useSectionCode'
import LeakReceiveTools from '@/components/storehouse/LeakReceiveTools.vue'
import { dateUtil } from '@/utils/dateUtil'

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref<any>(null)

// 搜索参数
const searchParams = reactive({
  day: dateUtil().format('YYYY-MM-DD'),
  other: 'shouldTakeList',
  bidCode: '',
})

const analysisStats = ref<any>({})

const workInfo = computed(() => {
  const planInfoList = analysisStats.value.planInfoList
  if (planInfoList && planInfoList.length > 0) {
    const workInfoArr = planInfoList.map((item: any) => item.content)
    return workInfoArr.join(',')
  } else {
    return ''
  }
})

onMounted(() => {
  getAnalysisStats()
})

useSectionCode((code: string) => {
  searchParams.bidCode = code
  handleReacquire(1)
})

/**
 * @desc 获取分析数据
 */
const getAnalysisStats = async () => {
  const { code, data } = await apiGetAnalysisStats({
    day: searchParams.day,
  })
  if (code === 20000) {
    analysisStats.value = data
  }
}

/**
 * @desc 刷新
 */
const handleReacquire = (page?: number) => {
  tableInstance.value?.handleReacquire(page)
  getAnalysisStats()
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    day: dateUtil().format('YYYY-MM-DD'),
  })
  handleReacquire(1)
}

/**
 ********************************* 查看漏领工器具 ******************************************
 */

const leakReceiveToolsInstance = ref()

/**
 * @desc 查看漏领工器具
 */
// const handleCheckMissTakeNum = () => {
//   leakReceiveToolsInstance.value.initModal()
// }
</script>

<style lang="less" scoped>
.receive-analysis-wrapper {
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
  .stats-info {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .stats-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 116px;
      margin-right: 14px;
      padding: 14px;
      background-color: #ffffff;
      position: relative;
      p {
        margin: 0;
      }
      .stats-label {
        font-size: 18px;
      }
      .stats-value {
        font-size: 36px;
      }
      .ant-btn {
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }
    .stats-item:last-child {
      margin-right: 0;
    }
  }
  .custom-table-wrap {
    height: calc(100% - 350px);
    margin-top: 20px;
    padding: 32px;
    background-color: #ffffff;
    position: relative;
  }
  .tip-info-wrap {
    margin-top: 20px;
    padding: 32px;
    background-color: #ffffff;
    .title-wrap {
      font-weight: bold;
      margin-bottom: 12px;
    }
  }
}
</style>
