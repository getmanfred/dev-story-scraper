import { ReadableStream, WritableStream, TransformStream } from 'node:stream/web';
import { Blob } from 'node:buffer';

// 1. Inyectar Streams y Buffers nativos de Node 18+ que Jest aísla
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any;
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = WritableStream as any;
}
if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = TransformStream as any;
}
if (typeof global.Blob === 'undefined') {
  global.Blob = Blob as any;
}

// 2. Copiar Web APIs nativas de Node (fetch, Headers, etc.) que Jest borra del entorno virtual
const webAPIs = ['fetch', 'Headers', 'Request', 'Response', 'FormData', 'File'];
for (const api of webAPIs) {
  if (typeof (global as any)[api] === 'undefined' && typeof (globalThis as any)[api] !== 'undefined') {
    (global as any)[api] = (globalThis as any)[api];
  }
}
