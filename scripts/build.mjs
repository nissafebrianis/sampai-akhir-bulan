import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

function cssInJsPlugin() {
  return {
    name: 'css-in-js',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const css = await fs.promises.readFile(args.path, 'utf8');
        const contents = [
          'const css = ' + JSON.stringify(css) + ';',
          'const style = document.createElement("style");',
          'style.setAttribute("data-bundle", "sampai-akhir-bulan");',
          'style.textContent = css;',
          'document.head.appendChild(style);',
          'export default css;'
        ].join('\n');
        return { contents, loader: 'js' };
      });
    },
  };
}

await esbuild.build({
  entryPoints: [path.join(srcDir, 'main.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  outfile: path.join(distDir, 'app.js'),
  minify: true,
  sourcemap: false,
  logLevel: 'info',
  plugins: [cssInJsPlugin()],
});

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const productionHtml = html.replace('/src/main.tsx', '/app.js');
fs.writeFileSync(path.join(distDir, 'index.html'), productionHtml, 'utf8');

const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
    const src = path.join(publicDir, entry.name);
    const dest = path.join(distDir, entry.name);
    fs.copyFileSync(src, dest);
  }
}

console.log('Built to dist/');
