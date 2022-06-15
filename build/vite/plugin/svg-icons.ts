import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'svg-[name]',
  });
  return svgIconsPlugin;
}
