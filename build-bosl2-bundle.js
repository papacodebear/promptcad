// node build-bosl2-bundle.js
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const BOSL2_DIR = './BOSL2';
const PREFIX    = '/home/web_user/.local/share/OpenSCAD/libraries/BOSL2';
const bundle    = {};

// Only top-level .scad files are ever include/use'd; skip examples/, tests/, images/, etc.
for (const entry of readdirSync(BOSL2_DIR, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.scad')) {
    bundle[`${PREFIX}/${entry.name}`] = readFileSync(`${BOSL2_DIR}/${entry.name}`, 'utf8');
  }
}

writeFileSync('./underware/bosl2-bundle.js', `export const BOSL2_BUNDLE = ${JSON.stringify(bundle)};\n`);
console.log(`Bundled ${Object.keys(bundle).length} files`);
