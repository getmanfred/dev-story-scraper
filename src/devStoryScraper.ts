import cheerio from 'cheerio';
import cleanDeep from 'clean-deep';

import {DevStoryDownloader} from './devStoryDownloader';
import {MAC} from './models/mac';
import {Logger} from './utils/logger';
import {Settings} from './models/settings';
import {AboutMeParser} from './parsers/aboutMeParser';
import {Geocoder} from './utils/geocoder';
import {ExperienceParser} from './parsers/experienceParser';
import {CareerPreferencesParser} from './parsers/careerPreferencesParser';
import {KnowledgeParser} from './parsers/knowledgeParser';

export class DevStoryScraper {
  aboutMeParser: AboutMeParser;
  experienceParser: ExperienceParser;
  knowledgeParser: KnowledgeParser;
  careerPreferencesParser: CareerPreferencesParser;

  constructor(private readonly downloader: DevStoryDownloader, geocoder: Geocoder) {
    this.aboutMeParser = new AboutMeParser(geocoder);
    // These parsers could be static, but declared here to keep code coherence
    this.experienceParser = new ExperienceParser();
    this.knowledgeParser = new KnowledgeParser();
    this.careerPreferencesParser = new CareerPreferencesParser();
  }

  async parse(username: string): Promise<MAC> {
    const log = Logger.getInstance();

    const url = `https://stackoverflow.com/story/${username}`;
    const profileAsHTML = await this.downloader.download(url);

    const startTime = new Date().getTime();

    const $ = cheerio.load(profileAsHTML);

    const settings = this.defaultSettings();
    const aboutMe = await this.aboutMeParser.parse($);
    const careerPreferences = this.careerPreferencesParser.parse($, url);
    const experience = this.experienceParser.parse($, careerPreferences);
    const knowledge = this.knowledgeParser.parse($);

    const elapsed = new Date().getTime() - startTime;
    log.debug(`${username} profile parsed in ${elapsed}ms`);

    const mac = {
      settings,
      aboutMe,
      experience,
      knowledge,
      careerPreferences,
    };

    return cleanDeep(mac) as MAC;
  }

  private defaultSettings(): Settings {
    return {
      language: 'EN',
      MACversion: '0.2',
    };
  }
}
