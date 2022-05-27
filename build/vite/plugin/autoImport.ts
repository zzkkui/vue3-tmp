import autoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function createAutoImport() {
  // 插件（hook）自动引入
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      {
        '@vueuse/core': [
          // 'useMouse', //声明后不用 import { useMouse } from '@vueuse/core' 导入,
          // // 可在这里定义vueuse别名
          // ['useFetch', 'useMyFetch'], //声明后不用 import { useFetch as useMyFetch } from '@vueuse/core' 导入,
        ],
      },
      'pinia',
    ],
    // eslintrc: {
    //   enabled: true,
    //   filepath: './.eslintrc-auto-import.json',
    //   globalsPropValue: true,
    // },
    resolvers: [AntDesignVueResolver()],
    dts: 'src/auto-imports.d.ts',
  });
}
