
let wasm;

/**
* @returns {number}
*/
export function perform_complicated_calculation() {
    const ret = wasm.perform_complicated_calculation();
    return ret >>> 0;
}

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} buffer
* @returns {number}
*/
export function eat_buffer(buffer) {
    const ret = wasm.eat_buffer(passArray8ToWasm(buffer), WASM_VECTOR_LEN);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}
/**
*/
export const Hello = Object.freeze({ Foo:0,Bar:1, });
/**
*/
export class ChaCha20Poly1305RFC {

    static __wrap(ptr) {
        const obj = Object.create(ChaCha20Poly1305RFC.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_chacha20poly1305rfc_free(ptr);
    }
    /**
    * @param {Uint8Array} key
    * @param {Uint8Array} nonce
    * @param {Uint8Array} aad
    * @returns {ChaCha20Poly1305RFC}
    */
    static new(key, nonce, aad) {
        const ret = wasm.chacha20poly1305rfc_new(passArray8ToWasm(key), WASM_VECTOR_LEN, passArray8ToWasm(nonce), WASM_VECTOR_LEN, passArray8ToWasm(aad), WASM_VECTOR_LEN);
        return ChaCha20Poly1305RFC.__wrap(ret);
    }
    /**
    * @param {Uint8Array} input
    * @param {Uint8Array} output
    * @param {Uint8Array} out_tag
    */
    encrypt(input, output, out_tag) {
        const ptr0 = passArray8ToWasm(output);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm(out_tag);
        const len1 = WASM_VECTOR_LEN;
        try {
            wasm.chacha20poly1305rfc_encrypt(this.ptr, passArray8ToWasm(input), WASM_VECTOR_LEN, ptr0, len0, ptr1, len1);
        } finally {
            output.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
            out_tag.set(getUint8Memory().subarray(ptr1 / 1, ptr1 / 1 + len1));
            wasm.__wbindgen_free(ptr1, len1 * 1);
        }
    }
    /**
    * @param {Uint8Array} input
    * @param {Uint8Array} output
    * @param {Uint8Array} tag
    * @returns {boolean}
    */
    decrypt(input, output, tag) {
        const ptr0 = passArray8ToWasm(output);
        const len0 = WASM_VECTOR_LEN;
        try {
            const ret = wasm.chacha20poly1305rfc_decrypt(this.ptr, passArray8ToWasm(input), WASM_VECTOR_LEN, ptr0, len0, passArray8ToWasm(tag), WASM_VECTOR_LEN);
            return ret !== 0;
        } finally {
            output.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

