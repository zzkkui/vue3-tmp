import path from 'path';
import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: 'src',
          replacement: path.resolve(__dirname, './src'),
        },
        {
          find: 'types',
          replacement: path.resolve(__dirname, './types'),
        },
      ],
    },
    server: {
      host: true,
      port: 9001,
      proxy: {
        '/external': {
          target: 'http://172.25.1.242:35232',
        },
        '/login': {
          target: 'http://172.25.1.242:35232',
        },
      },
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: ['@vue/runtime-core', '@vue/shared', '@iconify/iconify', 'ant-design-vue/es/locale/zh_CN'],
    },
  };
};
