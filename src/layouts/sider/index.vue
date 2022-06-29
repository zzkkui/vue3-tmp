<template>
  <Sider :collapsed="collapsed" :width="siderState.siderWidth" theme="light" class="sider" :style="getStyle">
    <div v-if="collapsible" class="collapse-icon" @click="() => commonStore.setCollapsed(!collapsed)">
      <IAntDesignMenuUnfoldOutlined v-if="collapsed" class="trigger" />
      <IAntDesignMenuFoldOutlined v-else class="trigger" />
    </div>
    <AMenu
      :openKeys="menuState.openKeys"
      :selectedKeys="menuState.selectedKeys"
      mode="inline"
      @openChange="onOpenChange"
    >
      <template v-for="menu in menus || []" :key="menu.path || menu.name">
        <template v-if="!menu.children">
          <AMenuItem :key="menu.path" @click="menuItemClick(menu)">
            <template #icon v-if="menu.icon">
              <CIcon :icon="menu.icon" :style="{ color: 'red' }" />
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
</template>

<script lang="ts" setup>
  import { getAllParentPath, Menu } from 'src/hooks/useMenu';
  import { CSSProperties, PropType } from 'vue';
  import { useCommonStore } from 'src/store/modules/common';
  import { Layout } from 'ant-design-vue';
  import CIcon from 'src/components/icon/Icon';

  interface MenuStateType {
    defaultSelectedKeys: string[];
    openKeys: string[];
    selectedKeys: string[];
    collapsedOpenKeys: string[];
    width: number;
  }

  const router = useRouter();
  const route = useRoute();

  const Sider = Layout.Sider;
  const DEFALUT_WIDTH = 230;
  const props = defineProps({
    menus: { type: Array as PropType<Menu[]> },
  });
  const commonStore = useCommonStore();
  const collapsible = commonStore.getCollapsible;
  const collapsed = computed(() => commonStore.getCollapsed);
  const hideHeader = commonStore.getHideHeader;

  const siderState = reactive({
    siderWidth: DEFALUT_WIDTH,
  });

  const getStyle = computed((): CSSProperties => {
    const height = hideHeader ? '100vh' : 'calc(100vh - 50px)';
    return {
      height,
    };
  });

  const menuState = reactive<MenuStateType>({
    defaultSelectedKeys: [],
    openKeys: [],
    selectedKeys: [],
    collapsedOpenKeys: [],
    width: DEFALUT_WIDTH,
  });

  watch(
    route,
    (route) => {
      menuState.selectedKeys = [route.fullPath];
      menuState.openKeys = props.menus ? getAllParentPath(props.menus, route.fullPath) : [];
    },
    { immediate: true },
  );

  watch(
    () => props.menus,
    (menus) => {
      if (!menus || menus.length === 0) {
        menuState.openKeys = [];
      } else {
        menuState.openKeys = getAllParentPath(menus, route.fullPath);
      }
    },
    { immediate: true },
  );

  // 含有子集的菜单点击
  function onOpenChange(openKeys) {
    menuState.openKeys = openKeys;
  }
  // 末尾菜单点击
  function menuItemClick(e) {
    if (e.path) {
      router.push(e.path);
      menuState.selectedKeys = [e.path];
    }
  }
  provide('menuItemClick', menuItemClick);
</script>

<style lang="less" scoped>
  .sider {
    overflow: auto;
    // height: 100vh;
    // flex: ;
    // position: fixed;
    // left: 0;
    // top: 0;
    // bottom: 0;
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
