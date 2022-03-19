import {Competence} from '../models/competence';

export class CompetenceParser {
  static parse(tags: string[] = []): Competence[] {
    return tags.map((t) => ({
      name: t,
      type: 'technology',
    }));
  }
}
