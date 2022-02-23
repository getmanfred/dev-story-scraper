import {LinkType, RelevantLink} from '../models/relevantLink';

export class RelevantLinksParser {
  static parse(input: string[] = []): RelevantLink[] {
    return input.map((link) => ({
      type: RelevantLinksParser.parseLinkType(link),
      URL: link,
    }));
  }

  private static parseLinkType(link: string): LinkType {
    if (link.includes('github.com')) {
      return 'github';
    } else if (link.includes('linkedin.com')) {
      return 'linkedin';
    } else if (link.includes('twitter.com')) {
      return 'twitter';
    }

    return 'other';
  }
}
