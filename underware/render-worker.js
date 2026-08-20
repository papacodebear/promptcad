import OpenSCAD from './openscad.js';
import { addFonts } from './openscad.fonts.js';
import { BOSL2_BUNDLE } from './bosl2-bundle.js';

const SCAD_BASE = 'https://raw.githubusercontent.com/AndyLevesque/QuackWorks/refs/heads/main/Underware/';

function ensureDir(FS, dir) {
  if (dir === '' || dir === '/') return;
  ensureDir(FS, dir.slice(0, dir.lastIndexOf('/')));
  try { FS.mkdir(dir); } catch (e) { if (e.errno !== 20 /* EEXIST */) throw e; }
}

// A fresh instance per render: this build aborts if callMain() runs twice on one instance.
async function createInstance() {
  const inst = await OpenSCAD({ noInitialRun: true });
  addFonts(inst);
  for (const [path, content] of Object.entries(BOSL2_BUNDLE)) {
    ensureDir(inst.FS, path.slice(0, path.lastIndexOf('/')));
    inst.FS.writeFile(path, content);
  }
  return inst;
}

self.onmessage = async (e) => {
  const { id, component, params } = e.data;
  try {
    const inst = await createInstance();
    const scad = await fetch(SCAD_BASE + component).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${component}`);
      return r.text();
    });

    inst.FS.writeFile('/input.scad', scad);

    const dFlags = Object.entries(params).flatMap(([k, v]) =>
      ['-D', typeof v === 'string' ? `${k}="${v}"` : `${k}=${v}`]
    );

    inst.callMain(['/input.scad', '-o', '/output.stl', '--backend=manifold', '--export-format=binstl', ...dFlags]);
    const stlBytes = inst.FS.readFile('/output.stl');
    self.postMessage({ id, ok: true, stlBytes }, [stlBytes.buffer]);
  } catch (err) {
    self.postMessage({ id, ok: false, error: (err && err.message) || String(err) });
  }
};
