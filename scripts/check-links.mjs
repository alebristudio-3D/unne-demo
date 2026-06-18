import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const basePath = (process.env.PUBLIC_BASE_PATH || '/').replace(/\/+$/, '') || '';
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

await walk(dist);
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/\shref=["']([^"'#]+)["']/g)].map((match) => match[1]);
  for (const rawHref of hrefs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(rawHref)) continue;
    let pathname = rawHref.split('?')[0];
    if (!pathname.startsWith('/')) continue;
    if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
      pathname = pathname.slice(basePath.length) || '/';
    }
    const target = pathname.endsWith('/')
      ? path.join(dist, pathname, 'index.html')
      : path.join(dist, pathname);
    const alternate = `${target}.html`;
    if (!(await exists(target)) && !(await exists(alternate))) {
      failures.push(`${path.relative(dist, file)} -> ${rawHref}`);
    }
  }
}

if (failures.length) {
  console.error('Enlaces internos rotos:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Link check: ${htmlFiles.length} páginas HTML sin enlaces internos rotos.`);
