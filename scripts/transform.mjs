import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const srcDir = path.join(rootDir, 'src');
export const distDir = path.join(rootDir, 'dist');
export const publicDir = path.join(rootDir, 'public');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function fileUrlFor(absPath) {
  return '/' + toPosix(path.relative(rootDir, absPath));
}

function tryResolveImport(fromFile, spec) {
  const baseDir = path.dirname(fromFile);
  const candidates = [];
  const raw = path.resolve(baseDir, spec);
  const ext = path.extname(spec);
  if (ext) {
    candidates.push(raw);
  } else {
    candidates.push(raw + '.ts');
    candidates.push(raw + '.tsx');
    candidates.push(raw + '.js');
    candidates.push(raw + '.jsx');
    candidates.push(path.join(raw, 'index.ts'));
    candidates.push(path.join(raw, 'index.tsx'));
    candidates.push(path.join(raw, 'index.js'));
    candidates.push(path.join(raw, 'index.jsx'));
  }
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function rewriteImportSpecifiers(code, fromFile) {
  const bareMap = new Map([
    ["react", "/node_modules/.vite/deps/react-shim.js"],
    ["react-dom/client", "/node_modules/.vite/deps/react-dom_client.js"],
    ["react/jsx-runtime", "/node_modules/.vite/deps/react_jsx-runtime.js"],
    ["react/jsx-dev-runtime", "/node_modules/.vite/deps/react_jsx-dev-runtime.js"],
  ]);
  const patterns = [
    /from\s+['\"]([^'\"]+)['\"]/g,
    /import\(\s*['\"]([^'\"]+)['\"]\s*\)/g,
    /export\s+[^;]+?\s+from\s+['\"]([^'\"]+)['\"]/g,
  ];

  let output = code;
  for (const pattern of patterns) {
    output = output.replace(pattern, (match, spec) => {
      if (spec.startsWith('.')) {
        const resolved = tryResolveImport(fromFile, spec);
        if (!resolved) return match;
        return match.replace(spec, fileUrlFor(resolved));
      }
      const mapped = bareMap.get(spec);
      return mapped ? match.replace(spec, mapped) : match;
    });
  }
  return output;
}

function mainCssInjection() {
  const cssPath = path.join(srcDir, 'styles', 'global.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  return [
    'const css = ' + JSON.stringify(css) + ';',
    'const style = document.createElement("style");',
    'style.setAttribute("data-bundle", "sampai-akhir-bulan");',
    'style.textContent = css;',
    'document.head.appendChild(style);',
  ].join('\n') + '\n';
}

export function transpileModule(filePath, sourceText) {
  let code = sourceText;
  const injectCss = filePath === path.join(srcDir, 'main.tsx');
  if (injectCss) {
    code = code.replace(/^import\s+['\"]\.\/styles\/global\.css['\"];?\s*$/gm, '');
  }
  const result = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      strict: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
    fileName: filePath,
  });
  let outputWithResolvedImports = rewriteImportSpecifiers(
    result.outputText,
    filePath
  );
  outputWithResolvedImports = outputWithResolvedImports
    .split("\n")
    .filter((line) => !line.includes("global.css"))
    .join("\n");
  if (!injectCss) {
    return outputWithResolvedImports;
  }
  const importBlockMatch = outputWithResolvedImports.match(/^(?:import[^\n]*\n)+/);
  if (!importBlockMatch) {
    return mainCssInjection() + outputWithResolvedImports;
  }
  const importBlock = importBlockMatch[0];
  return (
    importBlock +
    mainCssInjection() +
    outputWithResolvedImports.slice(importBlock.length)
  );
}

export function htmlTemplate() {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  return html;
}

export function serveContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.js' || ext === '.mjs' || ext === '.ts' || ext === '.tsx') return 'text/javascript; charset=utf-8';
  return 'application/octet-stream';
}

export function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function copyPublicAssets(targetRoot) {
  if (!fs.existsSync(publicDir)) return;
  for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
    const source = path.join(publicDir, entry.name);
    const target = path.join(targetRoot, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      ensureDir(target);
      fs.copyFileSync(source, target);
    }
  }
}

export function copyDir(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      ensureDir(target);
      fs.copyFileSync(source, target);
    }
  }
}

export function walkSourceFiles() {
  const files = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(full);
      } else if (/\.(ts|tsx|js|jsx|css|svg)$/.test(entry.name)) {
        files.push(full);
      }
    }
  };
  visit(srcDir);
  return files;
}
