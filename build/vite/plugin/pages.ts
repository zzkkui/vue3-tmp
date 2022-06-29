import Pages from 'vite-plugin-pages';

// 根据目录结构自动生成路由
export default function createPages() {
  return Pages({
    dirs: 'src/pages',
    exclude: ['**/components/**/*.vue'],
  });
}
