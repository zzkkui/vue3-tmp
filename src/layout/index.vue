<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutHeader v-if="getShowFullHeaderRef" />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <LayoutContent />
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup>
  import { Layout } from 'ant-design-vue';
  import LayoutHeader from './header/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutSideBar from './sider/index.vue';
</script>

<style lang="scss" scoped></style>
