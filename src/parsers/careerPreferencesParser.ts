import {CheerioAPI} from 'cheerio';
import {CareerPreferences} from '../models/careerPreferences';
import {MeanParser} from '../models/meanParser';

export class CareerPreferencesParser {
  parse($: CheerioAPI): CareerPreferences {
    const likedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .post-tag')
      .not('.disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const dislikedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    return {
      preferences: {
        preferredMeans: MeanParser.parse(likedTechnologies),
        discardedMeans: MeanParser.parse(dislikedTechnologies),
      },
    };
  }
}
