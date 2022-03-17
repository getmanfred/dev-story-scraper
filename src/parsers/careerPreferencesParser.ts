import * as _ from 'lodash';
import {CheerioAPI} from 'cheerio';

import {CareerPreferences, PublicProfile} from '../models/careerPreferences';
import {CompetenceParser} from './competenceParser';
import {AboutMe} from '../models/aboutMe';

export class CareerPreferencesParser {
  parse($: CheerioAPI, devStoryURL: string, aboutMe: AboutMe): CareerPreferences {
    const likedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .post-tag')
      .not('.disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const dislikedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    return {
      contact: {
        publicProfiles: this.getPublicProfiles(aboutMe, devStoryURL),
      },
      preferences: {
        preferredCompetences: CompetenceParser.parse(likedTechnologies),
        discardedCompetences: CompetenceParser.parse(dislikedTechnologies),
      },
    };
  }

  private getPublicProfiles(aboutMe: AboutMe, devStoryURL: string): PublicProfile[] {
    const links = aboutMe.relevantLinks || [];
    const publicProfiles = links
      .map((link) => {
        if (link.type === 'linkedin') {
          return {
            type: 'linkedin',
            URL: link.URL,
          };
        }
        if (link.type === 'github' || link.type === 'twitter') {
          return {
            type: 'other',
            URL: link.URL,
          };
        }
        return undefined;
      })
      .filter((publicProfile) => !_.isNil(publicProfile));

    if (publicProfiles.length === 0) {
      return [
        {
          type: 'stackoverflow',
          URL: devStoryURL,
        },
      ];
    }

    return publicProfiles as PublicProfile[];
  }
}
