import components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

export default function createComponents() {
  // 组件自动引入
  return components({
    resolvers: [
      AntDesignVueResolver(),
      IconsResolver({
        customCollections: ['svg'],
      }),
    ],
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
    dts: false,
  });
}
