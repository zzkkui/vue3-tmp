import Layouts from 'vite-plugin-vue-layouts';

// 配合 vite-plugin-pages 自动生成的路由可以根据配置形成不同的布局
export default function createLayouts() {
  return Layouts({
    layoutsDirs: 'src/layout',
    defaultLayout: 'index',
  });
}
