import {Geocoder} from '../utils/geocoder';
import {Location} from '../models/location';

export class MockGeocoder implements Geocoder {
  async geocode(input: string): Promise<Location> {
    if (input === 'Madrid, Spain') {
      return {
        country: 'ES',
        municipality: 'Madrid',
        region: 'Community of Madrid',
      };
    }

    return {
      country: 'US',
      municipality: 'Tampa',
      region: 'Florida',
    };
  }
}
