import {Mean} from './mean';

export class MeanParser {
  static parse(tags: string[]): Mean[] {
    return tags.map((t) => ({
      name: t,
      type: 'technology',
    }));
  }
}
