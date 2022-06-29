<template>
  <Layout>
    <LayoutHeader />
    <Layout class="main">
      <LayoutSideBar :menus="menus" />
      <LayoutContent />
    </Layout>
  </Layout>
</template>

<script setup>
  import LayoutHeader from './header/index.vue';
  import LayoutContent from './content/index.vue';

  import { useAppStore } from 'src/store/modules/app';
  import useMenu from 'src/hooks/useMenu';

  import LayoutSideBar from './sider/index.vue';
  const appStore = useAppStore();

  const routes = appStore.getHasPermissionRouter;
  const menus = useMenu(routes);
</script>

<style lang="less" scoped>
  .main {
    display: flex;
  }
</style>
