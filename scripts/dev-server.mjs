import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { htmlTemplate, rootDir, serveContentType, srcDir, transpileModule } from './transform.mjs';

const port = Number(process.env.PORT || 5180);
const indexHtml = htmlTemplate();

function send(res, status, body, contentType) {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(body);
}

function serveFile(reqPath) {
  const clean = reqPath === '/' ? '/index.html' : reqPath;
  const abs = path.join(rootDir, clean);
  if (!abs.startsWith(rootDir)) return null;
  if (clean === '/index.html') return { path: path.join(rootDir, 'index.html'), kind: 'html' };
  if (clean.startsWith('/src/')) {
    const sourcePath = path.join(rootDir, clean);
    if (!fs.existsSync(sourcePath)) return null;
    const raw = fs.readFileSync(sourcePath, 'utf8');
    const code = transpileModule(sourcePath, raw);
    return { kind: 'js', body: code, contentType: 'text/javascript; charset=utf-8' };
  }
  if (clean.startsWith('/node_modules/')) {
    const nmPath = path.join(rootDir, clean.slice(1));
    if (fs.existsSync(nmPath) && fs.statSync(nmPath).isFile()) {
      return { path: nmPath, kind: 'static' };
    }
  }
  const publicPath = path.join(rootDir, 'public', clean.slice(1));
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    return { path: publicPath, kind: 'static' };
  }
  const rootFile = path.join(rootDir, clean.slice(1));
  if (fs.existsSync(rootFile) && fs.statSync(rootFile).isFile()) {
    return { path: rootFile, kind: 'static' };
  }
  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
  const served = serveFile(url.pathname);
  if (!served) {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    return;
  }
  if (served.kind === 'html') {
    send(res, 200, indexHtml, 'text/html; charset=utf-8');
    return;
  }
  if (served.kind === 'js') {
    send(res, 200, served.body, served.contentType);
    return;
  }
  const body = fs.readFileSync(served.path);
  send(res, 200, body, serveContentType(served.path));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Dev server running at http://127.0.0.1:${port}`);
});
