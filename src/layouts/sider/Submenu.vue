<template>
  <ASubMenu :key="menuInfo.key">
    <template #icon><MailOutlined /></template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <AMenuItem :key="item.key">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.title }}
        </AMenuItem>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { Menu } from 'src/hooks/useMenu';
  const props = defineProps({
    menuInfo: { type: Object as PropType<Menu> },
  });
  console.log(props.menuInfo);
</script>

<style lang="less" scoped></style>
