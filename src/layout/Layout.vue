<template>
  <div class="app-wrapper">
    <Header />
    <div class="container-wrap">
      <Sidebar />
      <router-view name="sidebar" />
      <div class="main-wrapper">
        <Breadcrumb />
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" :key="route.fullPath" class="main-content" />
            </transition>
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import Breadcrumb from '@/layout/Breadcrumb.vue'
import { useAppStore } from '@/store/modules/app'
import { useWarehouseStore } from '@/store/modules/warehouse'
import { onMounted } from 'vue'

const appStore = useAppStore()
const warehouseStore = useWarehouseStore()

onMounted(() => {
  if (appStore.userInfo.token) {
    warehouseStore.GetMsgReminderNum()
  }
})
</script>
<style lang="less">
.app-wrapper {
  background-color: #f0f2f5;
  .container-wrap {
    display: flex;
    .main-wrapper {
      flex: 1;
      .main-content {
        height: calc(100vh - 138px);
        margin: 0 14px;
        box-sizing: border-box;
        overflow: auto;
        .handle-wrap {
          background-color: #ffffff;
          padding: 14px;
        }
        .table-wrap {
          position: relative;
          background-color: #ffffff;
          padding: 14px 14px 0 14px;
          margin-top: 14px;
          height: calc(100% - 74px);
        }
      }
    }
  }
}
</style>
