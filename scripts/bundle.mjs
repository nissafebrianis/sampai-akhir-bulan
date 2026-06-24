import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const srcDir = path.join(rootDir, 'src');
export const distDir = path.join(rootDir, 'dist');
export const devDir = path.join(rootDir, 'work', 'dev');

export function htmlTemplate() {
  const htmlPath = path.join(rootDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  return html.replace('/src/main.tsx', '/app.js');
}

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

export async function bundle({ outdir, minify = false, sourcemap = false, write = true } = {}) {
  const result = await esbuild.build({
    absWorkingDir: rootDir,
    entryPoints: [path.join(srcDir, 'main.tsx')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    outdir,
    outfile: outdir ? undefined : path.join(rootDir, 'bundle.js'),
    write,
    sourcemap,
    minify,
    logLevel: 'silent',
    metafile: true,
    plugins: [cssInJsPlugin()],
  });
  return result;
}

export function serveStaticFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.json': 'application/json; charset=utf-8',
  };
  return map[ext] || 'application/octet-stream';
}
