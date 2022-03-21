import * as _ from 'lodash';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {DatesParser} from '../parsers/datesParser';

type TimelineItem = {
  title: string;
  startDate?: string;
  endDate?: string;
};

export class TimelineForFixer {
  private readonly timeline: TimelineItem[];

  constructor(timelineItems: DevStoryArtifact[]) {
    this.timeline = timelineItems.map((item): TimelineItem => {
      const [startDate, endDate] = DatesParser.parse(item.time);
      return {
        title: item.title,
        startDate,
        endDate,
      };
    });
  }

  timeFor(name: string): string | undefined {
    const itemIndex = _.findIndex(this.timeline, (element) => element.title === name);
    const nearestStartDateIndex = _.findLastIndex(
      this.timeline,
      (element, elementIndex) => !_.isNil(element.startDate) && element.startDate !== '' && elementIndex < itemIndex,
    );
    return this.timeline[nearestStartDateIndex]?.startDate;
  }
}
