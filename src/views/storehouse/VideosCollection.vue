<template>
  <div class="videos-collection-wrapper">
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="视频编号">
          <a-input v-model:value="searchParams.num" placeholder="请输入视频编号" />
        </a-form-item>
        <a-form-item label="日期">
          <a-date-picker v-model:value="searchParams.videoTime" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
        </a-form-item>
        <a-form-item label="视频长度">
          <a-input-number v-model:value="searchParams.length" :min="0" placeholder="请输入视频长度(分钟)" />
        </a-form-item>
        <a-form-item label="异常视频">
          <a-select v-model:value="searchParams.status" placeholder="请选择" allowClear>
            <a-select-option :value="true">正常</a-select-option>
            <a-select-option :value="false">异常</a-select-option>
          </a-select>
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
        :columns="videosCollectionColumns"
        :getTableList="apiGetVideoCollectRecord"
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
    <VideoPlayer ref="videoPlayerInstance" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { apiGetVideoCollectRecord } from '@/service/api/storehouse'
import { videosCollectionColumns } from '@/enums/tableHeadEnum'
import useSectionCode from '@/hooks/useSectionCode'
import VideoPlayer from '@/components/storehouse/VideoPlayer.vue'
import { message } from 'ant-design-vue'

/**
 ********************************* 表格操作 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 搜索参数
const searchParams = reactive({
  num: '',
  videoTime: '',
  length: '',
  status: null,
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
  const reg = /^([1-9]\d?)$/
  if (searchParams.length) {
    if (reg.test(searchParams.length)) {
      tableInstance.value.handleReacquire(page)
    } else {
      message.warn('视频长度请输入整数')
    }
  } else {
    tableInstance.value.handleReacquire(page)
  }
}

/**
 * @desc 重置
 */
const handleReset = () => {
  Object.assign(searchParams, {
    num: '',
    videoTime: '',
    length: '',
    status: null,
  })
  handleReacquire(1)
}

/**
 ********************************* 详情操作 ******************************************
 */

const videoPlayerInstance = ref()

/**
 * @desc 查看视频
 */
const handleCheck = (record: any) => {
  if (record.url) {
    const videoList = [
      {
        channel: record.channel,
        url: record.url,
      },
    ]
    videoPlayerInstance.value.handleOpenVideo(videoList)
  } else {
    message.info('暂无视频信息')
  }
}
</script>

<style lang="less" scoped>
.videos-collection-wrapper {
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
      .ant-input-number {
        width: 100%;
      }
    }
  }
  .custom-table-wrap {
    height: calc(100% - 170px);
    margin-top: 20px;
    padding: 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
