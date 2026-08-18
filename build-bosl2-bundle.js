// node build-bosl2-bundle.js
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const BOSL2_DIR = './BOSL2';
const PREFIX    = '/home/web_user/.local/share/OpenSCAD/libraries/BOSL2';
const bundle    = {};

// BOSL2's own .scad files only ever `include`/`use` sibling top-level .scad
// files (never anything from examples/, tests/, images/, etc.), so only those
// need to land in the WASM virtual FS.
for (const entry of readdirSync(BOSL2_DIR, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.scad')) {
    bundle[`${PREFIX}/${entry.name}`] = readFileSync(`${BOSL2_DIR}/${entry.name}`, 'utf8');
  }
}

writeFileSync('./underware/bosl2-bundle.js', `const BOSL2_BUNDLE = ${JSON.stringify(bundle)};`);
console.log(`Bundled ${Object.keys(bundle).length} files`);
