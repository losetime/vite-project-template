<template>
  <a-layout-sider
    width="200"
    v-model:collapsed="sidebarStatus"
    :trigger="null"
    collapsible
    theme="light"
    class="layout-sider-wrapper"
  >
    <a-menu mode="inline" :selectedKeys="navKey" @select="handleSelectKeys">
      <template v-for="item in sidebarMenu" :key="item.name">
        <a-sub-menu :key="item.name" v-if="isVisibleNextRoute(item)">
          <template #icon>
            <Iconfont :type="item.meta.icon" class="icon-font" />
          </template>
          <template #title>{{ item.meta.title }}</template>
          <template v-for="subItem in item.children">
            <a-menu-item v-if="isVisibleRoute(subItem)" :key="subItem.name">
              <span>{{ subItem.meta.title }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item :key="item.name" v-if="!isVisibleNextRoute(item)">
          <template #icon>
            <Iconfont :type="item.meta.icon" class="icon-font" />
          </template>
          <span>{{ item.meta.title }}</span>
          <a-badge :count="cycleReminderNum" v-if="item.name === 'CycleReminder' && cycleReminderNum > 0" />
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useWarehouseStore } from '@/store/modules/warehouse'
import Iconfont from '@/components/common/Iconfont.vue'
import { isVisibleNextRoute, isVisibleRoute } from '@/utils/base'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const warehouseStore = useWarehouseStore()

// 所有二级导航菜单
const sidebarMenu = ref<any[]>([])

// 匹配当前二级导航
const navKey = ref<string[]>([])

// 侧边栏打开/收起
const sidebarStatus = computed(() => appStore.sidebarStatus)

const routeInfo = computed(() => appStore.routeInfo)

// 检验周期提醒
const cycleReminderNum = computed(() => warehouseStore.cycleReminderNum)

const handleFormattMenu = (data: any[], menu: any[]): any[] => {
  for (const [index, item] of data.entries()) {
    if (item.visible === '0') {
      menu.push({
        name: item.routerName,
        meta: {
          title: item.menuName,
          level: item.level,
          icon: item.icon,
          visible: item.visible === '0',
        },
        children: [],
      })
      if (item.children.length > 0 && menu[index]) {
        handleFormattMenu(item.children, menu[index].children)
      }
    }
  }
  return menu
}

watch(
  () => routeInfo.value,
  (val: any[]) => {
    const routeMetched = route.matched
    // 匹配一级导航
    const firstRoute = routeMetched[0].name
    const findItem = val.find((item: any) => item.routerName === firstRoute)
    sidebarMenu.value = handleFormattMenu(findItem.children, [])
    if (sidebarMenu.value.length > 0) {
      if (routeMetched.length > 1) {
        // 匹配最后一级路由，且属性为显示
        const lastRoute = routeMetched[routeMetched.length - 1].name
        navKey.value = [lastRoute as string]
      } else {
        const matchedName = sidebarMenu.value[0].name
        navKey.value = [matchedName]
        router.replace({ name: matchedName })
      }
    }
  },
  {
    immediate: true,
  },
)

/**
 * @desc 选择菜单
 */
const handleSelectKeys = ({ selectedKeys }: any) => {
  navKey.value = selectedKeys
  router.replace({ name: selectedKeys[0] })
}
</script>

<style lang="less" scoped>
.layout-sider-wrapper {
  height: calc(100vh - 64px);
  overflow: auto;
  background: #fff;
  .anticon {
    font-size: 20px;
  }
  ::v-deep(.ant-menu) {
    .ant-menu-item {
      width: 94%;
      margin-left: 6%;
      .ant-badge {
        position: absolute;
        top: 2px;
        right: 18px;
      }
    }
    .ant-menu-submenu-title {
      padding-left: 36px !important;
    }
    .ant-menu-item-selected {
      background: linear-gradient(228deg, #3b72ff 0%, #2f8dff 100%) !important;
      border-radius: 6px;
      color: white !important;
      overflow: visible;
      position: relative;
      transition: all 0.1s;
      &::before {
        content: '';
        height: 40px;
        width: 5px;
        background: linear-gradient(228deg, #2f8dff 0%, #3d6cfe 100%);
        border-radius: 3px;
        position: absolute;
        top: 0;
        left: -11px;
      }
      &::after {
        transform: scaleY(0) !important;
      }
    }
  }
}
</style>
