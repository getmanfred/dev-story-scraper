import {Geocoder} from '../utils/geocoder';
import {Location} from '../models/location';

export class MockGeocoder implements Geocoder {
  async geocode(input: string): Promise<Location> {
    if (input === 'Madrid, Spain') {
      return {
        country: 'ES',
        municipality: 'Madrid',
        region: 'Community of Madrid',
        notes: 'Autocompleted using Google Maps API',
      };
    }

    return {
      country: 'US',
      municipality: 'Tampa',
      region: 'Florida',
      notes: 'Autocompleted using Google Maps API',
    };
  }
}
