import ViteRestart from 'vite-plugin-restart';

export default function createRestart() {
  const pluginsFile: string[] = [];
  const fs = require('fs');
  fs.readdirSync('build/vite/plugin').map((dirname) => {
    if (fs.statSync(`build/vite/plugin/${dirname}`).isFile()) {
      pluginsFile.push(`build/vite/plugin/${dirname}`);
    }
  });
  return ViteRestart({
    restart: pluginsFile,
  });
}
