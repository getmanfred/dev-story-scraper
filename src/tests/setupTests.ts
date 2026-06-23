import { ReadableStream, WritableStream, TransformStream } from 'node:stream/web';
import { Blob, File } from 'node:buffer';
import { MessagePort, MessageChannel } from 'node:worker_threads';

// 1. Inyectar de forma explícita las clases WebIDL que Jest aísla de Node 18+
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
if (typeof global.File === 'undefined') {
  global.File = File as any;
}
if (typeof global.MessagePort === 'undefined') {
  global.MessagePort = MessagePort as any;
}
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = MessageChannel as any;
}

// 2. Copiar Web APIs nativas de Node (fetch, Headers, Cryptography, etc.) que Jest borra de su entorno virtual
const webAPIs = ['fetch', 'Headers', 'Request', 'Response', 'FormData', 'crypto', 'Crypto', 'CryptoKey', 'DOMException'];
for (const api of webAPIs) {
  if (typeof (global as any)[api] === 'undefined' && typeof (globalThis as any)[api] !== 'undefined') {
    (global as any)[api] = (globalThis as any)[api];
  }
}
