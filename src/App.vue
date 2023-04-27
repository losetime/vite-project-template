<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import { useAppStore } from '@/store/modules/app'

const locale = ref(zhCN)

const appStore = useAppStore()

watch(
  () => appStore.$state,
  (val: any) => {
    sessionStorage.setItem('appStore', JSON.stringify(val))
  },
  {
    deep: true,
  },
)
</script>

<style lang="less">
/* 自定义字体引入 */
@font-face {
  font-family: AliPH;
  src: url(./assets/font/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.ttf) format('truetype');
}

body {
  font-family: AliPH;
  width: 100% !important;
  overflow-y: hidden;
  .ant-btn {
    border-radius: 6px;
  }
  .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;
  }
  .ant-space {
    gap: 12px !important;
  }
}
</style>
