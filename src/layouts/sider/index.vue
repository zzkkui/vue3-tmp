<template>
  <div>
    <Sider
      v-model:collapsed="collapsed"
      :width="siderState.siderWidth"
      theme="light"
      class="sider"
      :style="hideHeader ? { top: 0 } : { top: '50px' }"
    >
      <div v-if="collapsible" class="collapse-icon" @click="() => commonStore.setCollapsed(!collapsed)">
        <IAntDesignMenuUnfoldOutlined v-if="collapsed" class="trigger" />
        <IAntDesignMenuFoldOutlined v-else class="trigger" />
      </div>
      <AMenu v-model:openKeys="menuState.openKeys" v-model:selectedKeys="menuState.selectedKeys" mode="inline">
        <template v-for="menu in menus || []" :key="menu.path || menu.name">
          <template v-if="!menu.children">
            <AMenuItem :key="menu.name">
              <!-- <IAntDesignHomeOutlined /> -->
              <template #icon v-if="menu.icon">
                <CIcon :icon="menu.icon" :style="{ color: 'red' }" />
                <!-- {{ getMenuIcon(menu.icon) }} -->
                <!-- <AntdIcon type="DashboardOutlined" /> -->
              </template>
              {{ menu.title }}
            </AMenuItem>
          </template>
          <template v-else>
            <SubMenu :menu-info="menu" :key="menu.path" />
          </template>
        </template>
      </AMenu>
    </Sider>
  </div>
</template>

<script lang="ts" setup>
  import type { Menu } from 'src/hooks/useMenu';
  import { KeepAlive, PropType } from 'vue';
  import { useCommonStore } from 'src/store/modules/common';
  import { Layout } from 'ant-design-vue';
  import * as $Icon from '@ant-design/icons-vue';
  import SubMenu from './Submenu.vue';
  import CIcon from 'src/components/icon/Icon.tsx';

  const Sider = Layout.Sider;
  const DEFALUT_WIDTH = 230;
  const props = defineProps({
    menus: { type: Array as PropType<Menu[]> },
  });
  const commonStore = useCommonStore();
  const collapsible = commonStore.getCollapsible;
  const collapsed = computed(() => commonStore.getCollapsed);
  const hideHeader = computed(() => commonStore.hideHeader);

  // const CSubMenu = defineComponent({
  //   render() {
  //     return h(SubMenu);
  //   },
  // });

  const siderState = reactive({
    collapsedWidth: collapsible ? DEFALUT_WIDTH : 0,
    siderWidth: DEFALUT_WIDTH,
  });

  const menuState = reactive({
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    width: DEFALUT_WIDTH,
  });

  // console.log('Icon', MenuIcon);

  // function getMenuIcon(icon) {
  //   return h($Icon[icon]);
  // }

  // const { menus } = props;

  console.log('menus', props.menus);
</script>

<style lang="less" scoped>
  .sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 5px 0 7px 1px rgb(204 217 234 / 31%);
    .collapse-icon {
      text-align: center;
      cursor: pointer;
      height: 30px;
      padding: 5px 0;
      color: #a7b5d3;
      border-bottom: 1px solid #d4dff3;
      svg {
        font-size: 16px;
      }
    }
  }
</style>
