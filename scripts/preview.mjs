import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { distDir, serveContentType } from './transform.mjs';

const port = Number(process.env.PORT || 4173);
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const nodeModulesDir = path.join(distDir, 'node_modules');
const fallbackNodeModulesDir = path.resolve(distDir, '..', 'node_modules');

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
  const reqPath = url.pathname === '/' ? '/index.html' : url.pathname;
  let filePath = path.join(distDir, reqPath);

  if (reqPath.startsWith('/node_modules/')) {
    const localPath = path.join(nodeModulesDir, reqPath.slice('/node_modules/'.length));
    const fallbackPath = path.join(fallbackNodeModulesDir, reqPath.slice('/node_modules/'.length));
    filePath = fs.existsSync(localPath) ? localPath : fallbackPath;
  }

  if (!filePath.startsWith(distDir) && !filePath.startsWith(nodeModulesDir) && !filePath.startsWith(fallbackNodeModulesDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': serveContentType(filePath) });
  res.end(fs.readFileSync(filePath));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview running at http://127.0.0.1:${port}`);
});
