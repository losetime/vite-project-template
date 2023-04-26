<template>
  <icon-font :type="type" />
</template>

<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'

// const iconUrl = new URL('../../assets/iconfont/iconfont.js', import.meta.url).href

const iconUrl = '//at.alicdn.com/t/c/font_3094271_a4b6bl1l19.js'

const IconFont = createFromIconfontCN({
  scriptUrl: iconUrl,
})

defineProps<{
  type: string
}>()
</script>
