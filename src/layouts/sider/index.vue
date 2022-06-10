<template>
  <div> sider </div>
</template>

<script lang="ts" setup>
  import type { Menu } from 'src/hooks/useMenu';
  import type { PropType } from 'vue';
  const props = defineProps({
    menus: { type: Array as PropType<Menu[]> },
  });
  console.log(props.menus);
</script>

<style lang="scss" scoped></style>
