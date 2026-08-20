#!/usr/bin/env bash
set -euo pipefail
WASM_BUILD_URL="https://files.openscad.org/snapshots/OpenSCAD-2026.08.19-WebAssembly-web.zip"
curl -fsSL "$WASM_BUILD_URL" -o /tmp/openscad-wasm.zip
unzip -o /tmp/openscad-wasm.zip -d underware

# Engine-independent FS writer; still sourced from the older release that shipped it.
curl -fsSL "https://github.com/openscad/openscad-wasm/releases/download/2022.03.20/openscad.fonts.js" -o underware/openscad.fonts.js

node build-bosl2-bundle.js
node build-agent-skills-index.js
