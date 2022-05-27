import type { PluginOption } from 'vite';
import spritesmith from 'vite-plugin-spritesmith';
import fs from 'fs';

export default function createSpritesmith(isBuild) {
  // 小图标合成雪碧图
  const spriteDirnames: string[] = [];
  fs.readdirSync('src/assets/sprites').map((dirname) => {
    if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
      spriteDirnames.push(dirname);
    }
  });
  const plugins: PluginOption[] = [];
  spriteDirnames.map((item) => {
    plugins.push(
      spritesmith({
        watch: !isBuild,
        src: {
          cwd: `./src/assets/sprites/${item}`,
          glob: '*.png',
        },
        target: {
          image: `./src/assets/sprites/${item}.png`,
          css: [
            [
              `./src/assets/sprites/_${item}.less`,
              {
                format: 'handlebars_based_template',
              },
            ],
          ],
        },
        apiOptions: {
          cssImageRef: `@/assets/sprites/${item}.png`,
          spritesheet_info: {
            name: item,
            format: 'handlebars_based_template',
          },
        },
        // customTemplates: {},
        spritesmithOptions: {
          algorithm: 'binary-tree',
          padding: 10,
        },
      }),
    );
  });
  return plugins;
}
