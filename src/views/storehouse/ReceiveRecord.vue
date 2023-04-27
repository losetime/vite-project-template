<template>
  <div class="receive-record-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="姓名">
          <a-input v-model:value="searchParams.recipientName" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="工器具分类">
          <a-select v-model:value="searchParams.toolTag" placeholder="请选择工器具分类">
            <a-select-option v-for="item in toolsTypeOptions" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="searchParams.status" placeholder="请选择状态" :options="toolStatusOptions" />
        </a-form-item>
        <a-form-item label="领用时间">
          <a-range-picker
            v-model:value="reactiveTime"
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            @change="onReceiveTimeChange"
          />
        </a-form-item>
        <a-form-item label="rfid编码">
          <a-input v-model:value="searchParams.epc" placeholder="请输入rfid编码" />
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
        :columns="receiveRecordColumns"
        :getTableList="apiGetToolsReceiveList"
        :params="searchParams"
        :is-immediately="false"
        ref="tableInstance"
      >
        <template #status="{ record }">
          {{ record.errorStatusStr ? record.errorStatusStr : toolStatusEnum(record.status) }}
        </template>
        <template #receiveTime="{ record }">
          <a-space>
            <span>{{ record.receiveTime }}</span>
            <a-button type="link" size="small" @click="handleCheckVideo(record.recVideoList)">查看视频</a-button>
          </a-space>
        </template>
        <template #returnTime="{ record }">
          <a-space>
            <span>{{ record.returnTime || '--' }}</span>
            <a-button type="link" size="small" @click="handleCheckVideo(record.retVideoList)">查看视频</a-button>
          </a-space>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="handleCheck(record)">查看</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <tag-read-in-detail
      :handleReacquire="handleReacquire"
      :toolsTypeOptions="toolsTypeOptions || []"
      ref="detailInstance"
    />
    <VideoPlayer ref="videoPlayerInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import TagReadInDetail from '@/components/storehouse/TagReadInDetail.vue'
import { apiGetToolsReceiveList, apiGetToolDetail } from '@/service/api/storehouse'
import { apiGetDicts } from '@/service/api/common'
import { receiveRecordColumns } from '@/enums/tableHeadEnum'
import { actionTypeEnum } from '@/enums/commonEnum'
import useSectionCode from '@/hooks/useSectionCode'
import VideoPlayer from '@/components/storehouse/VideoPlayer.vue'
import { message } from 'ant-design-vue'
import { toolStatusEnum } from '@/enums/storehouseEnum'

const toolStatusOptions = [
  {
    label: '在库',
    value: '0',
  },
  {
    label: '已领用',
    value: '2',
  },
  {
    label: '在库(异常)',
    value: '7',
  },
]

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

const reactiveTime = ref<string[]>([])

// 搜索参数
const searchParams = reactive({
  bidCode: '',
  recipientName: '',
  epc: '',
  receiveTimeStart: '',
  receiveTimeEnd: '',
  toolTag: null,
  status: null,
})

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
 * @desc 领用时间范围
 */
const onReceiveTimeChange = (value: string[]) => {
  searchParams.receiveTimeStart = value[0]
  searchParams.receiveTimeEnd = value[1]
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    recipientName: '',
    epc: '',
    receiveTimeStart: '',
    receiveTimeEnd: '',
    toolTag: null,
    status: null,
  })
  reactiveTime.value = []
  toolsNameOptions.value = []
  toolsModelOptions.value = []
  handleReacquire(1)
}

/**
 ********************************* 详情操作 ******************************************
 */

const detailInstance = ref()

const videoPlayerInstance = ref<any>(null)

/**
 * @desc 查看视频
 */
const handleCheckVideo = async (videoList: any) => {
  if (videoList && videoList.length > 0) {
    videoPlayerInstance.value.handleOpenVideo(videoList)
  } else {
    message.info('暂无视频信息')
  }
}

/**
 * @desc 查看
 */
const handleCheck = async (record: any) => {
  const { code, data } = await apiGetToolDetail({ id: record.toolId })
  if (code === 20000) {
    detailInstance.value.initModal(actionTypeEnum.CHECK, data)
  }
}
</script>

<style lang="less" scoped>
.receive-record-wrapper {
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
    background-color: #ffffff;
    position: relative;
    margin-top: 20px;
  }
}
</style>
