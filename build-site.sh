#!/usr/bin/env bash
set -euo pipefail
VER=2022.03.20
BASE="https://github.com/openscad/openscad-wasm/releases/download/$VER"
for f in openscad.js openscad.wasm.js openscad.wasm openscad.fonts.js; do
  curl -fsSL "$BASE/$f" -o "underware/$f"
done
node build-bosl2-bundle.js
