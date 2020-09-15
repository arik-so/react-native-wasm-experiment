
const path = require('path').join(__dirname, 'chacha_poly1305_rust_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./chacha_poly1305_rust.js'] = require('./chacha_poly1305_rust.js');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
