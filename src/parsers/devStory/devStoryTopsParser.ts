import cheerio, {CheerioAPI} from 'cheerio';
import {CareerPreferences} from '../../models/careerPreferences';
import {PublicArtifact} from '../../models/publicArtifact';
import {stripString} from '../../utils/utils';
import {Competence} from '../../models/competence';
import * as _ from 'lodash';
import {CompetenceParser} from '../competenceParser';

export class DevStoryTopsParser {
  static parse($: CheerioAPI, careerPreferences: CareerPreferences): PublicArtifact[] {
    return $('.user-technologies .top')
      .get()
      .map((e) => {
        const topElement = cheerio.load($(e).html() || '');

        const topTags = topElement('.post-tag')
          .get()
          .map((e) => stripString($(e).text() || ''));

        const relatedCompetences = DevStoryTopsParser.parsePreferredCompetences(topTags, careerPreferences);

        return {
          details: {
            name: DevStoryTopsParser.parseName(topElement),
            description: stripString(topElement('.informative-tooltip').text()),
          },
          type: 'achievement',
          publishingDate: '2022-03-04', // Fixed because of tests and because it is not calculated in any important way
          relatedCompetences,
        };
      });
  }

  private static parseName($: CheerioAPI): string {
    const quantity = stripString($('.number').text());

    return `Top ${quantity} at Stack Overflow answers`;
  }

  private static parsePreferredCompetences(topTags: string[], careerPreferences: CareerPreferences): Competence[] {
    const preferredCompetences = careerPreferences.preferences.preferredCompetences;

    return _.intersectionBy(CompetenceParser.parse(topTags), preferredCompetences, 'name');
  }
}
