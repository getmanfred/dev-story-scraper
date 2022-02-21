import TurndownService from 'turndown';

export class Markdown {
  private static translator: TurndownService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static getInstance(): TurndownService {
    if (!this.translator) {
      this.translator = new TurndownService({
        bulletListMarker: '*',
      });
    }

    return this.translator;
  }

  static fromHTML(input: string): string {
    return this.getInstance().turndown(input);
  }
}
