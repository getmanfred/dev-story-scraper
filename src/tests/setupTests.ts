import { ReadableStream } from 'node:stream/web';

if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any;
}
