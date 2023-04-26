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
              <!-- <template #icon>
                <Iconfont :type="subItem.meta.icon" class="icon-font" />
              </template> -->
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import Iconfont from '@/components/common/Iconfont.vue'
import { isVisibleNextRoute, isVisibleRoute } from '@/utils/base'
// import { apiGetRoutersInfo } from '@/service/api/login'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 所有二级导航菜单
// const sidebarMenu = computed<Array<any>>(() => route.matched[0].children)
const sidebarMenu = ref<any[]>([])

// 匹配当前二级导航
const navKey = ref<string[]>([])

// 侧边栏打开/收起
const sidebarStatus = computed(() => appStore.sidebarStatus)

const routeInfo = computed(() => appStore.routeInfo)

// 检验周期提醒
const cycleReminderNum = computed(() => appStore.cycleReminderNum)

// watchEffect(() => {
//   if (route.matched[0].children.length > 0) {
//     navKey.value = isVisibleNextRoute(route.matched[1])
//       ? ([route.matched[2].name] as string[])
//       : ([route.matched[1].name] as string[])
//   }
// })

onMounted(() => {})

// const getRouters = async () => {
//   const { code, data } = await apiGetRoutersInfo()
//   if (code === 20000) {
//     sidebarMenu.value = handleFormattMenu(data, [])[0].children
//     console.log('menu', sidebarMenu.value)
//   }
// }

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
          link: item.path,
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
    console.log('routeInfo.value 更新')
    sidebarMenu.value = handleFormattMenu(val, [])[1].children
  },
  {
    deep: true,
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
