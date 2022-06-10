<template>
  <Header v-if="!hideHeader">
    <div class="headerBox">Header</div>
  </Header>
</template>

<script setup>
  import { useAppStore } from 'src/store/modules/app';
  const store = useAppStore();
  const { hideHeader } = storeToRefs(store);
</script>

<style lang="less" scoped>
  .headerBox {
    position: relative;
    background: #182435;
    height: 50px;
    line-height: 50px;
    color: #fff;
    padding: 0 20px;
  }
</style>
