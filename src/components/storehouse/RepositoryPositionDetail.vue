<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="800px"
  >
    <div class="table-wrap">
      <ym-table
        rowKey="id"
        :columns="warehouseStatusColumns"
        :getTableList="apiGetShippingSpaceDetailRecord"
        :is-immediately="false"
        :params="searchParams"
        :pagination="false"
        :row-selection="false"
        ref="tableInstance"
      >
        <template #status="{ record }">
          <a-space>
            <span>{{ record.errorStatusStr ? record.errorStatusStr : toolStatusEnum(record.status) }}</span>
            <a-button
              type="link"
              size="small"
              @click="handleCheckVideo(record.errorStatusVideoList)"
              v-if="record.errorStatusStr"
              >查看视频</a-button
            >
          </a-space>
        </template>
      </ym-table>
    </div>
    <VideoPlayer ref="videoPlayerInstance" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { warehouseStatusColumns } from '@/enums/tableHeadEnum'
import { apiGetShippingSpaceDetailRecord } from '@/service/api/storehouse'
import { toolStatusEnum } from '@/enums/storehouseEnum'
import { message } from 'ant-design-vue'

const visible = ref<boolean>(false)

const title = ref<string>('仓位详情信息')

const tableInstance = ref<any>(null)

const videoPlayerInstance = ref<any>(null)

// 搜索参数
const searchParams = reactive({
  positionId: '',
})

/**
 * @desc 初始化对话框
 */
const initModal = async (positionId: string) => {
  if (!positionId) return
  visible.value = true
  searchParams.positionId = positionId
  nextTick(() => {
    tableInstance.value.handleReacquire(1)
  })
}

/**
 * @desc 查看视频
 */
const handleCheckVideo = (videoList: any[]) => {
  if (videoList && videoList.length > 0) {
    videoPlayerInstance.value.handleOpenVideo(videoList)
  } else {
    message.info('暂无视频信息')
  }
}

/**
 * @desc 确认操作
 */
const handleConfirm = () => {
  handleCancel()
}

/**
 * @desc 取消操作
 */
const handleCancel = () => {
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.table-wrap {
  height: 400px;
  overflow-y: auto;
}
</style>
