import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import purgeIcons from 'vite-plugin-purge-icons';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import createAutoImport from './autoImport';
import createComponents from './components';
import createRestart from './restart';
import createSpritesmith from './spritesmith';
import createPages from './pages';
import createLayouts from './layouts';
import createIconComponent from './unplugin-icons';
import { configSvgIconsPlugin } from './svg-icons';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_SPRITE,
    VITE_USE_AUTOIMPORT,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // unplugin-icons
  vitePlugins.push(createIconComponent());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // unplugin-auto-import
  VITE_USE_AUTOIMPORT && vitePlugins.push(createAutoImport());

  // unplugin-vue-components
  VITE_USE_AUTOIMPORT && vitePlugins.push(createComponents());

  // vite-plugin-restart
  vitePlugins.push(createRestart());

  // vite-plugin-spritesmith
  VITE_USE_SPRITE && vitePlugins.push(createSpritesmith(isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // vite-plugin-pages
  vitePlugins.push(createPages());

  // vite-plugin-vue-layouts
  vitePlugins.push(createLayouts());

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }

  return vitePlugins;
}
