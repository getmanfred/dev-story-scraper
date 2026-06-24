// 1. Requerir módulos nativos de forma imperativa sin colisionar con tipos globales de TS
const streamWeb = require('node:stream/web');
const bufferModule = require('node:buffer');
const workerThreads = require('node:worker_threads');

// 2. Definir de forma prioritaria las clases de WebIDL en el global de Jest
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = streamWeb.ReadableStream;
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = streamWeb.WritableStream;
}
if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = streamWeb.TransformStream;
}
if (typeof global.Blob === 'undefined') {
  global.Blob = bufferModule.Blob;
}
if (typeof global.File === 'undefined') {
  global.File = bufferModule.File;
}
if (typeof global.MessagePort === 'undefined') {
  global.MessagePort = workerThreads.MessagePort;
}
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = workerThreads.MessageChannel;
}

if (typeof global.DOMException === 'undefined') {
  global.DOMException = class DOMException extends Error {
    constructor(message?: any, name?: any) {
      super(message);
      this.name = name || 'DOMException';
    }
  } as any;
}

// 3. Requerir undici de forma segura (una vez que todas las globales ya están inyectadas)
const undici = require('undici');

if (typeof global.fetch === 'undefined') {
  global.fetch = undici.fetch;
}
if (typeof global.Headers === 'undefined') {
  global.Headers = undici.Headers;
}
if (typeof global.Request === 'undefined') {
  global.Request = undici.Request;
}
if (typeof global.Response === 'undefined') {
  global.Response = undici.Response;
}
if (typeof global.FormData === 'undefined') {
  global.FormData = undici.FormData;
}
