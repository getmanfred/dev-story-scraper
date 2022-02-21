import {pino} from 'pino';

export class Logger {
  private static instance: pino.Logger;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): pino.Logger {
    if (!this.instance) {
      this.instance = pino({
        name: 'dev-story-scraper',
        level: process.env.LOG_LEVEL || 'info',
      });
    }

    return this.instance;
  }
}
