import express from 'express';

import {Logger} from './utils/logger';
import {TorDevStoryDownloader} from './downloader/torDevStoryDownloader';
import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';
import {ProfileNotFoundException} from './errors/profileNotFoundException';

const app = express();
const log = Logger.getInstance();
const downloader = new TorDevStoryDownloader();
const geocoder = new GoogleGeocoder();
const scraper = new DevStoryScraper(downloader, geocoder);

const port = process.env.SO_PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const username = (req.query.username as string) || '';
    const profile = await scraper.parse(username);
    res.json(profile);
  } catch (e) {
    // Not using a middleware because it is too simple and a temporal service
    if (e instanceof ProfileNotFoundException) {
      res.status(404);
    } else {
      res.status(500);
    }
    res.json({
      error: e,
    });
  }
});

app.listen(port, () => {
  log.info(`Server listening at http://localhost:${port}`);
});
