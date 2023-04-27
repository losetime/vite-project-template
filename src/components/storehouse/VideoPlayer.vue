<template>
  <a-modal v-model:visible="visible" :destroyOnClose="true" :footer="null" width="800px" class="video-player-wrapper">
    <div class="camera-choose-wrap">
      <template v-for="(item, index) in videoList" :key="index">
        <span :class="{ 'item-wrap': true, 'active-item': index === activeIndex }" @click="onChooseCamera(index)">
          {{ item.channel }}号摄像头
        </span>
      </template>
    </div>
    <video :src="videoList[activeIndex]?.url" controls class="video-js"></video>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)

const videoList = ref<any[]>([])

const activeIndex = ref<number>(0)

/**
 * @desc 打开视频播放器
 */
const handleOpenVideo = (video: any[]) => {
  if (video && Array.isArray(video)) {
    videoList.value = video
  }
  visible.value = true
}

const onChooseCamera = (index: number) => {
  activeIndex.value = index
}

defineExpose({
  handleOpenVideo,
})
</script>

<style lang="less">
.video-player-wrapper {
  .ant-modal-content {
    background-color: #000000;
    .ant-modal-close {
      .ant-modal-close-x {
        .anticon-close {
          color: #ffffff !important;
        }
      }
    }
    .ant-modal-body {
      .camera-choose-wrap {
        margin-top: 20px;
        .item-wrap {
          padding: 5px 16px;
          background-color: #ffffff;
          border-radius: 6px;
          margin-left: 12px;
          cursor: pointer;
          &:first-child {
            margin-left: 0;
          }
        }
        .active-item {
          background-color: #3977ff;
          color: #ffffff;
        }
      }
      .video-js {
        width: 100%;
        height: 420px;
        margin-top: 20px;
        .vjs-big-play-button {
          top: 42%;
          left: 42%;
        }
      }
    }
  }
}
</style>
