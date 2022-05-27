<!-- iconfont.cn 上的自定义图标 -->
<template>
  <div class="anticon svg-icon" v-if="iconHref">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconHref" />
    </svg>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { createFromIconfontCN } from '@ant-design/icons-vue';

  createFromIconfontCN({
    // 内网情况下下载到本地
    scriptUrl: '//at.alicdn.com/t/font_3432582_grev41s0tf.js', // 在 iconfont.cn 上生成
  });

  const props = defineProps({
    name: {
      type: String,
    },
  });

  const iconHref = computed(() => {
    if (props.name && props.name.indexOf('icon') > -1) {
      return `#${props.name}`;
    } else if (props.name) {
      return `#svg-${props.name}`;
    } else {
      return '';
    }
  });
</script>

<style lang="less" scoped>
  // .svg-icon > span {
  //   display: inline-block;
  //   width: 100%;
  //   height: 100%;
  //   justify-content: center;
  //   align-items: center;
  // }
  .svg-icon {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 1.2em;
    height: 1.2em;
    .icon {
      width: 1.2em;
      height: 1.2em;
      fill: currentColor;
      overflow: hidden;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  // :deep(svg) {
  //   width: 1.2em;
  //   height: 1.2em;
  //   line-height: 35px;
  //   display: inline-block;
  //   vertical-align: -0.15em;
  //   fill: currentColor;
  //   overflow: hidden;
  // }
</style>
