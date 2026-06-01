import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'build/client/assets');

const manifestFile = readdirSync(assetsDir).find(
  (f) => f.startsWith('manifest-') && f.endsWith('.js'),
);
if (!manifestFile) throw new Error('No manifest-*.js found in build/client/assets');

const src = readFileSync(join(assetsDir, manifestFile), 'utf8');
const manifest = JSON.parse(
  src.replace('window.__reactRouterManifest=', '').replace(/;$/, ''),
);

// /__manifest returns route patches: { [routeId]: routeEntry }
// Returning all routes works for any ?paths= combination since S3 can't filter.
writeFileSync(join(root, 'build/client/__manifest'), JSON.stringify(manifest.routes));
console.log(`Generated __manifest with ${Object.keys(manifest.routes).length} routes from ${manifestFile}`);
