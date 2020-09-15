/* tslint:disable */
/**
* @returns {number} 
*/
export function perform_complicated_calculation(): number;
/**
* @param {Uint8Array} buffer 
* @returns {number} 
*/
export function eat_buffer(buffer: Uint8Array): number;
export enum Hello {
  Foo,
  Bar,
}
/**
*/
/**
*/
export class ChaCha20Poly1305RFC {
  free(): void;
/**
* @param {Uint8Array} key 
* @param {Uint8Array} nonce 
* @param {Uint8Array} aad 
* @returns {ChaCha20Poly1305RFC} 
*/
  static new(key: Uint8Array, nonce: Uint8Array, aad: Uint8Array): ChaCha20Poly1305RFC;
/**
* @param {Uint8Array} input 
* @param {Uint8Array} output 
* @param {Uint8Array} out_tag 
*/
  encrypt(input: Uint8Array, output: Uint8Array, out_tag: Uint8Array): void;
/**
* @param {Uint8Array} input 
* @param {Uint8Array} output 
* @param {Uint8Array} tag 
* @returns {boolean} 
*/
  decrypt(input: Uint8Array, output: Uint8Array, tag: Uint8Array): boolean;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        