<template>
  <RouterView>
    <template #default="{ Component, route }">
      <div class="content">
        <KeepAlive>
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </div>
    </template>
  </RouterView>
</template>

<script setup></script>

<style lang="less" scoped>
  .content {
    flex: auto;
  }
</style>
