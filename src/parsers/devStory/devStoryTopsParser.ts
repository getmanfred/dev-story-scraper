import cheerio, {CheerioAPI} from 'cheerio';
import {CareerPreferences} from '../../models/careerPreferences';
import {PublicArtifact} from '../../models/publicArtifact';
import {stripString} from '../../utils/utils';
import moment from 'moment';
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
          publishingDate: moment().format('YYYY-MM-DD'),
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
