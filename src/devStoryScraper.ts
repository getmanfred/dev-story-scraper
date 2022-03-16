import cheerio from 'cheerio';
import cleanDeep from 'clean-deep';

import {DevStoryDownloader} from './downloader/devStoryDownloader';
import {MAC} from './models/mac';
import {Logger} from './utils/logger';
import {Settings} from './models/settings';
import {AboutMeParser} from './parsers/aboutMeParser';
import {Geocoder} from './utils/geocoder';
import {ExperienceParser} from './parsers/experienceParser';
import {CareerPreferencesParser} from './parsers/careerPreferencesParser';
import {KnowledgeParser} from './parsers/knowledgeParser';
import {DevStoryURL} from './devStoryURL';
import {JobParser} from './parsers/jobParser';

export class DevStoryScraper {
  aboutMeParser: AboutMeParser;
  experienceParser: ExperienceParser;
  knowledgeParser: KnowledgeParser;
  careerPreferencesParser: CareerPreferencesParser;

  constructor(private readonly downloader: DevStoryDownloader, geocoder: Geocoder, jobParser: JobParser) {
    this.aboutMeParser = new AboutMeParser(geocoder);
    this.experienceParser = new ExperienceParser(jobParser);
    // These parsers could be static, but declared here to keep code coherence
    this.knowledgeParser = new KnowledgeParser();
    this.careerPreferencesParser = new CareerPreferencesParser();
  }

  async parse(source: string): Promise<MAC> {
    const log = Logger.getInstance();

    const url = DevStoryURL.from(source);
    const profileAsHTML = await this.downloader.download(url);

    const startTime = new Date().getTime();

    const $ = cheerio.load(profileAsHTML);

    const settings = this.defaultSettings();
    const aboutMe = await this.aboutMeParser.parse($);
    const careerPreferences = this.careerPreferencesParser.parse($, url);
    const experience = await this.experienceParser.parse($, careerPreferences);
    const knowledge = this.knowledgeParser.parse($);

    const elapsed = new Date().getTime() - startTime;
    log.debug(`${source} profile parsed in ${elapsed}ms`);

    const mac = {
      settings,
      aboutMe,
      experience,
      knowledge,
      careerPreferences,
    };

    const cleanMac = cleanDeep(mac) as MAC;
    // Some fields are mandatory by the JSON Schema but are not present at Stack Overflow's dev story
    cleanMac.aboutMe.profile.title = cleanMac.aboutMe.profile.title || '';

    return cleanMac;
  }

  private defaultSettings(): Settings {
    return {
      language: 'EN',
      MACversion: '0.2',
    };
  }
}
