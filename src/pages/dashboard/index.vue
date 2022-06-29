<template>
  <div class="dashbord">
    dashboard
    <AButton type="primary">Primary Button</AButton>
    <SvgIcon type="weixiu" />
    <SvgIcon type="svg|banquan" />
    <IAntDesignAccountBookOutlined />
    <AntdIcon
      type="DashboardOutlined"
      :style="{
        color: 'red',
      }"
    />
    <!-- <ISvgYinSi style="font-size: 2em; fill: red" /> -->
  </div>
</template>

<script setup>
  import AntdIcon from 'src/components/icon/AntdIcon.tsx';
</script>

<style lang="less" scoped>
  .dashbord {
    position: relative;
  }
</style>
