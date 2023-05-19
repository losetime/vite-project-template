<template>
  <div class="storehouse-overview-wrapper">
    <div class="left-content-wrap">
      <div class="to-do-wrap">
        <div class="title">待办事项</div>
        <div class="content-wrap">
          <template v-for="item in todoRecord" :key="item.id">
            <div class="item-wrap" v-if="item.dataType === 'OVER_CHECK'">
              <a-checkbox v-show="false" />
              <div class="actual-content">
                <div class="label-wrap">
                  <p class="label-text">{{ item.title }}</p>
                  <a-button type="link" @click="handleOverCheck(item)">
                    去处理
                    <right-outlined style="padding-top: 5px" />
                  </a-button>
                </div>
                <p class="inspection-time">
                  脱检日期：<span style="color: #ff4c50">{{ item.infoJson.inspectEnd }}</span>
                </p>
              </div>
            </div>
            <div class="item-wrap" v-else-if="item.dataType === 'STOCK_LACK'">
              <a-checkbox @change="onStockLackChange(item)" />
              <div class="actual-content">
                <p class="label-text">
                  {{ item.title }}
                </p>
                <div class="desc-wrap">
                  <p class="desc-text">{{ item.infoJson.tooltype }}</p>
                  <span class="handle-btn" @click="handleNotRemind">不再提醒</span>
                </div>
              </div>
            </div>
            <div class="item-wrap" v-else>
              <a-checkbox @change="onStockLackChange(item)" />
              <div class="actual-content">
                <p class="label-text">
                  {{ item.title }}
                </p>
                <div class="desc-wrap">
                  <p class="desc-text">{{ item.infoJson.toolRecPeople }}领用{{ item.infoJson.tooltype }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="processed-wrap">
        <div class="title">已处理</div>
        <div class="content-wrap">
          <template v-for="item in doneMatter" :key="item.id">
            <div class="item-wrap" v-if="item.dataType === 'OVER_CHECK'">
              <a-checkbox :checked="true" />
              <div class="actual-content">
                <div class="label-wrap">
                  <p class="label-text">{{ item.title }}</p>
                </div>
                <p class="inspection-time">
                  脱检日期：<span style="color: #ff4c50">{{ item.infoJson.inspectEnd }}</span>
                </p>
              </div>
            </div>
            <div class="item-wrap" v-else-if="item.dataType === 'STOCK_LACK'">
              <a-checkbox :checked="true" />
              <div class="actual-content">
                <p class="label-text">
                  {{ item.title }}
                </p>
                <div class="desc-wrap">
                  <p class="desc-text">{{ item.infoJson.tooltype }}</p>
                </div>
              </div>
            </div>
            <div class="item-wrap" v-else>
              <a-checkbox :checked="true" />
              <div class="actual-content">
                <p class="label-text">
                  {{ item.title }}
                </p>
                <div class="desc-wrap">
                  <p class="desc-text">{{ item.infoJson.toolRecPeople }}领用{{ item.infoJson.tooltype }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="body-wrap">
      <div class="stats-info">
        <div class="stats-item" @click="handleShortcut('CycleReminder')">
          <img src="../../assets/images/storehouse/test-cycle.png" alt="" />
          <p>检验周期维护</p>
        </div>
        <div class="stats-item" @click="handleShortcut('VideosCollection')">
          <img src="../../assets/images/storehouse/video-manage.png" alt="" />
          <p>视频管理</p>
        </div>
      </div>
      <div class="right-content-wrap">
        <div class="bottom-wrap">
          <div class="item-wrap" v-show="showProportion">
            <div class="title-wrap" @click="showProportion = false">
              <div class="title-text">
                <left-outlined />
                工器具出库数量
              </div>
            </div>
            <div class="chart-wrap">
              <Pie :series="toolReturnProportion?.series || []" :legend="toolReturnRate?.legend" />
            </div>
          </div>
          <div class="item-wrap" v-show="!showProportion">
            <div class="title-wrap">
              <div class="title-text">工器具出库数量</div>
            </div>
            <div class="chart-wrap">
              <Pie
                :series="toolReturnRate?.series || []"
                :legend="toolReturnRate?.legend"
                :color="['#FF9939', '#4DC66E']"
                ref="returnRateInstance"
              />
            </div>
          </div>
          <div class="item-wrap" v-show="showDismissalTool">
            <div class="title-wrap" @click="showDismissalTool = false">
              <div class="title-text">
                <left-outlined />
                工器具脱检状态
              </div>
            </div>
            <div class="chart-wrap">
              <Pie :series="toolNoCheckCompared?.series || []" :legend="toolReturnRate?.legend" />
            </div>
          </div>
          <div class="item-wrap" v-show="!showDismissalTool">
            <div class="title-wrap">
              <div class="title-text">工器具脱检状态</div>
            </div>
            <div class="chart-wrap">
              <Pie
                :series="toolStatusRate?.series || []"
                :legend="toolReturnRate?.legend"
                :color="['#3286FF', '#FF676B']"
                ref="toolStatusInstance"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <inspection-done :handleReacquire="() => onStockLackChange(currentOverCheck)" ref="inspectionDoneInstance" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiGetToolTodoRecord, apiHandleNotRemind, apiHandleTodoDone, apiGetToolCount } from '@/service/api/storehouse'
import { dateUtil } from '@/utils/dateUtil'
import Pie from '@/components/charts/Pie.vue'
import useSectionCode from '@/hooks/useSectionCode'
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import InspectionDone from '@/components/storehouse/InspectionDone.vue'

const router = useRouter()

const todoRecord = ref<any[]>([])

const doneMatter = ref<any[]>([])

const timeRange = ref<string[]>([])

const { sectionCode } = useSectionCode(() => {
  getToolReturnRate()
  getToolStatusRate()
  timeRange.value = [dateUtil().subtract(7, 'day').format('YYYY-MM-DD'), dateUtil().format('YYYY-MM-DD')]
  getToolTodoRecord('0')
  getToolTodoRecord('1')
})

// -------------------------------------待办事项/已处理事项---------------------------------------------

const inspectionDoneInstance = ref<any>(null)

/**
 * @desc 待办事项/已处理事项查询
 */
const getToolTodoRecord = async (status: string) => {
  const { code, data } = await apiGetToolTodoRecord({ status: status })
  if (code === 20000) {
    switch (status) {
      // 待处理
      case '0':
        todoRecord.value = data
        break
      // 已处理
      case '1':
        doneMatter.value = data
        break
    }
  }
}

/**
 * @desc 不再提醒
 */
const handleNotRemind = async () => {
  const { code } = await apiHandleNotRemind()
  if (code === 20000) {
    getToolTodoRecord('0')
  }
}

const currentOverCheck = ref<any>({})

/**
 * @desc 处理脱检
 */
const handleOverCheck = (record: any) => {
  currentOverCheck.value = record
  inspectionDoneInstance.value.initModal({
    id: record.infoJson.toolId,
    inspectStart: record.infoJson.inspectStart,
    inspectEnd: record.infoJson.inspectEnd,
  })
}

/**
 * @desc 处理待办事项
 */
const onStockLackChange = async (record: any) => {
  const { code } = await apiHandleTodoDone({ id: record.id })
  if (code === 20000) {
    getToolTodoRecord('0')
    getToolTodoRecord('1')
  }
}

/**
 * @desc 快捷方式
 */
const handleShortcut = (routeName: string) => {
  router.push({
    name: routeName,
  })
}

// ---------------------------------工器具出库数量-----------------------------------------

const returnRateInstance = ref()

const showProportion = ref(false)

// 工器具归还率
const toolReturnRate = ref<any>({})

// 已归还工器具占比
const toolReturnProportion = ref<any>({})

/**
 * @desc 工器具归还率
 */
const getToolReturnRate = async () => {
  const { code, data } = await apiGetToolCount({ bidNo: sectionCode.value, dataType: 'returnRate' })
  if (code === 20000) {
    toolReturnRate.value = {
      series: [
        {
          type: 'pie',
          radius: '50%',
          itemStyle: {
            borderRadius: 4,
          },
          label: {
            formatter: (obj: any) => {
              return `${obj.percent}% \n详情 >`
            },
            lineHeight: 18,
            backgroundColor: 'none',
          },
          data: data.map((item: any) => ({
            value: item.count,
            name: item.type === 'IN_USE' ? '待归还' : '已归还',
          })),
        },
      ],
      legend: {
        left: 'right',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
    }
    setTimeout(onReturnRate, 1000)
  }
}

const onReturnRate = () => {
  returnRateInstance.value.chartInstance.on('click', { name: '已归还' }, function () {
    showProportion.value = true
    getToolReturnProportion('returnTool')
  })
  returnRateInstance.value.chartInstance.on('click', { name: '待归还' }, function () {
    showProportion.value = true
    getToolReturnProportion('needReturnTool')
  })
}

/**
 * @desc 已归还工器具占比
 */
const getToolReturnProportion = async (type: string) => {
  const { code, data } = await apiGetToolCount({ bidNo: sectionCode.value, dataType: type })
  if (code === 20000) {
    toolReturnProportion.value = {
      series: [
        {
          type: 'pie',
          radius: '50%',
          itemStyle: {
            borderRadius: 4,
          },
          label: {
            formatter: '{d}%',
            backgroundColor: 'none',
          },
          data: data.map((item: any) => ({
            value: item.count,
            name: item.type,
          })),
        },
      ],
      legend: {
        left: 'right',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
    }
  }
}

// ---------------------------------工器具脱检状态-----------------------------------------

const toolStatusInstance = ref()

const showDismissalTool = ref(false)

const toolStatusRate = ref()

const toolNoCheckCompared = ref()

/**
 * @desc 工器具状态占比
 */
const getToolStatusRate = async () => {
  const { code, data } = await apiGetToolCount({ bidNo: sectionCode.value, dataType: 'checkRate' })
  if (code === 20000) {
    toolStatusRate.value = {
      series: [
        {
          type: 'pie',
          radius: '50%',
          itemStyle: {
            borderRadius: 4,
          },
          label: {
            formatter: (obj: any) => {
              return `${obj.percent}% \n详情 >`
            },
            lineHeight: 18,
            backgroundColor: 'none',
          },
          data: data.map((item: any) => ({
            value: item.count,
            name: item.type === 'CHECKED' ? '正常工器具' : '脱检工器具',
          })),
        },
      ],
      legend: {
        left: 'right',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
    }
    setTimeout(onToolStatus, 1000)
  }
}

const onToolStatus = () => {
  toolStatusInstance.value.chartInstance.on('click', { name: '脱检工器具' }, function () {
    showDismissalTool.value = true
    getToolNoCheckCompared('overCheckTool')
  })
  toolStatusInstance.value.chartInstance.on('click', { name: '正常工器具' }, function () {
    showDismissalTool.value = true
    getToolNoCheckCompared('hasCheckTool')
  })
}

/**
 * @desc 脱检工器具占比
 */
const getToolNoCheckCompared = async (type: string) => {
  const { code, data } = await apiGetToolCount({ bidNo: sectionCode.value, dataType: type })
  if (code === 20000) {
    toolNoCheckCompared.value = {
      series: [
        {
          type: 'pie',
          radius: '50%',
          itemStyle: {
            borderRadius: 4,
          },
          label: {
            formatter: '{d}%',
            backgroundColor: 'none',
          },
          data: data.map((item: any) => ({
            value: item.count,
            name: item.type,
          })),
        },
      ],
      legend: {
        left: 'right',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
    }
  }
}
</script>

<style lang="less" scoped>
.storehouse-overview-wrapper {
  display: flex;
  justify-content: space-between;
  .left-content-wrap {
    width: 320px;
    background-color: #ffffff;
    .to-do-wrap,
    .processed-wrap {
      width: 100%;
      padding: 24px;
      .title {
        color: #333333;
        font-size: 16px;
        font-weight: bold;
      }
      .content-wrap {
        margin-top: 16px;
        max-height: 340px;
        overflow-y: auto;
        .item-wrap {
          display: flex;
          align-items: center;
          background-color: #f7fafd;
          margin-bottom: 20px;
          padding: 20px 14px;
          .label-text {
            font-size: 16px;
            color: #333333;
            margin: 0;
          }
          .actual-content {
            margin-left: 14px;
            .label-wrap,
            .desc-wrap {
              width: 200px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .label-text {
                font-size: 16px;
                color: #333333;
                margin: 0;
              }
              .desc-text,
              .handle-btn {
                font-size: 14px;
                color: #778795;
                margin: 0;
              }
              .handle-btn {
                cursor: pointer;
              }
              .ant-btn {
                padding: 0;
              }
            }
            .inspection-time {
              font-size: 14px;
              color: #778795;
              margin: 0;
            }
          }
        }
        .item-wrap:last-child {
          margin-bottom: 0;
        }
      }
    }
    .processed-wrap {
      border-top: 1px solid #efefef;
      opacity: 0.6;
    }
  }
  .body-wrap {
    flex: 1;
    margin-left: 20px;
    .stats-info {
      display: flex;
      justify-content: space-between;
      .stats-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 116px;
        margin-right: 20px;
        padding: 14px;
        background-color: #ffffff;
        cursor: pointer;
        img {
          width: 55px;
          height: 55px;
        }
        p {
          margin: 0;
          font-size: 18px;
          color: #333333;
        }
      }
      .stats-item:last-child {
        margin-right: 0;
      }
    }
    .right-content-wrap {
      .item-wrap {
        width: 100%;
        padding: 24px;
        background-color: #ffffff;
        .title-wrap {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          .title-text {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
        }
        .chart-wrap {
          position: relative;
          height: 326px;
          margin-top: 14px;
        }
      }
      .bottom-wrap {
        display: flex;
        margin-top: 20px;
        .item-wrap {
          flex: 1;
          padding: 24px;
          background-color: #ffffff;
          .title-wrap {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            .title-text {
              font-size: 16px;
              font-weight: bold;
              color: #333333;
            }
          }
          .chart-wrap {
            position: relative;
            height: 326px;
            width: 100%;
            margin-top: 14px;
          }
        }
        .item-wrap:last-child {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
