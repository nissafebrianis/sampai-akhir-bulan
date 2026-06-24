import fs from 'node:fs';
import path from 'node:path';
import { copyDir, copyPublicAssets, distDir, ensureDir, htmlTemplate, transpileModule, walkSourceFiles, rootDir } from './transform.mjs';

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const filePath of walkSourceFiles()) {
  const relative = path.relative(rootDir, filePath);
  const target = path.join(distDir, relative);
  ensureDir(target);
  if (filePath.endsWith('.css') || filePath.endsWith('.svg')) {
    fs.copyFileSync(filePath, target);
  } else {
    const source = fs.readFileSync(filePath, 'utf8');
    const code = transpileModule(filePath, source);
    fs.writeFileSync(target, code, 'utf8');
  }
}

copyPublicAssets(distDir);

const viteDepsSource = path.join(rootDir, 'node_modules', '.vite', 'deps');
const viteDepsTarget = path.join(distDir, 'node_modules', '.vite', 'deps');
if (fs.existsSync(viteDepsSource)) {
  copyDir(viteDepsSource, viteDepsTarget);
}

fs.writeFileSync(path.join(distDir, 'index.html'), htmlTemplate(), 'utf8');
console.log('Built to dist/');
