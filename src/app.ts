import express from 'express';

import {Logger} from './utils/logger';
import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';
import {ProfileNotFoundException} from './errors/profileNotFoundException';
import {DevStoryDownloader} from './downloader/devStoryDownloader';
import {JobParser} from './parsers/jobParser';
import {CompanyUrlParser} from './parsers/companyUrlParser';
import {HttpClient} from './clients/httpClient';

const app = express();
const log = Logger.getInstance();
const httpClient = new HttpClient();
const downloader = new DevStoryDownloader(httpClient);
const geocoder = new GoogleGeocoder();
const companyUrlParser = new CompanyUrlParser(httpClient);
const jobParser = new JobParser(companyUrlParser);
const scraper = new DevStoryScraper(downloader, geocoder, jobParser);

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
      res.json({
        error: 'No profile found for given username',
      });
    } else {
      log.error(e);
      res.status(500);
      res.json({
        error: `Unknown error`,
      });
    }
  }
});

app.get('/version', async (req, res) => {
  res.json({
    version: '1.0.1',
  });
});

app.listen(port, () => {
  log.info(`Server listening at http://localhost:${port}`);
});
