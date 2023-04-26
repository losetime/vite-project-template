<template>
  <div class="app-wrapper">
    <!-- <router-view /> -->
    <!-- <Header /> -->
    <div class="container-wrap">
      <!-- <router-view name="sidebar" /> -->
      <Sidebar />
      <div class="main-wrapper">
        <!-- <router-view name="breadcrumb" /> -->
        <Breadcrumb />
        <router-view class="main-wrap" />
        <!-- <router-view name="main" class="main-wrap" v-if="currentLevel === 3">
          <router-view name="mainSub" class="main-sub-wrap" />
        </router-view>
        <router-view name="main" class="main-wrap" v-if="currentLevel === 4">
          <router-view name="mainSub" class="main-sub-wrap">
            <router-view name="fourLevelWrap" class="four-level-wrap" />
          </router-view>
        </router-view> -->
        <!-- <Suspense>
          <template #default>
            <router-view class="main-wrap" /> -->
        <!-- {{ route.path }}
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <keep-alive>
                  <component :is="Component" :key="route.name" />
                </keep-alive>
              </transition> -->
        <!-- </router-view> -->
        <!-- </template>
          <template #fallback> Loading... </template>
        </Suspense> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { computed } from 'vue'
// import { useRoute } from 'vue-router'
// import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import Breadcrumb from '@/layout/Breadcrumb.vue'
// import { useAppStore } from '@/store/modules/app'

// const route = useRoute()

// const appStore = useAppStore()

// const currentLevel = computed(() => route.meta.level)

// if (store.state.token) {
//   store.dispatch('GetMsgReminderNum')
// }
</script>
<style lang="less">
.app-wrapper {
  background-color: #f0f2f5;
  .container-wrap {
    display: flex;
    .main-wrapper {
      flex: 1;
      height: calc(100vh - 102px);
      width: 100%;
      .main-wrap {
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
      .main-sub-wrap {
        height: calc(100vh - 138px);
        margin: 0 14px;
        overflow: auto;
      }
      .four-level-wrap {
        height: calc(100vh - 138px);
        margin: 0 14px;
        overflow: auto;
      }
    }
  }
}
</style>
