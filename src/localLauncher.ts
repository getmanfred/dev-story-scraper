import * as _ from 'lodash';

import {DevStoryDownloader} from './devStoryDownloader';
import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';

!(async () => {
  const downloader = new DevStoryDownloader();
  const geocoder = new GoogleGeocoder();

  const devStoryScraper = new DevStoryScraper(downloader, geocoder);

  const username = process.argv[2];
  if (_.isNil(username)) {
    console.error('No valid username given, run "yarn test:local <username>"');
  } else {
    const result = await devStoryScraper.parse(username);
    console.log(JSON.stringify(result, null, 3));
  }
})();
