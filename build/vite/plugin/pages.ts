import Pages from 'vite-plugin-pages';

export default function createPages() {
  return Pages({
    dirs: 'src/pages',
    exclude: ['**/components/**/*.vue'],
  });
}
