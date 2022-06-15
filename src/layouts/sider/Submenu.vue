<template>
  <ASubMenu :key="menuInfo.path">
    <template #icon v-if="menuInfo.icon"><CIcon :icon="menuInfo.icon" :style="{ color: 'red' }" /></template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <AMenuItem :key="item.path">
          <template #icon v-if="item.icon"> <CIcon :icon="item.icon" /> </template>
          {{ item.title }}
        </AMenuItem>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { Menu } from 'src/hooks/useMenu';
  import CIcon from 'src/components/icon/Icon.tsx';
  const props = defineProps({
    menuInfo: { type: Object as PropType<Menu> },
  });
</script>

<style lang="less" scoped></style>
