import {asNameAndSurnames} from '../utils/utils';

describe('A name and surnames parsing', () => {
  it('should separate simple name components', () => {
    const result = asNameAndSurnames('John Smith');
    expect(result).toStrictEqual(['John', 'Smith']);
  });

  it('should separate middlename as name', () => {
    const result = asNameAndSurnames('Emma W. Wallace');
    expect(result).toStrictEqual(['Emma W.', 'Wallace']);
  });

  it('should separate multiple surnames', () => {
    const result = asNameAndSurnames('Juan Martín Pérez');
    expect(result).toStrictEqual(['Juan', 'Martín Pérez']);
  });

  it('should separate names with just initial letter', () => {
    const result = asNameAndSurnames('T. J. Crowder');
    expect(result).toStrictEqual(['T. J.', 'Crowder']);
  });

  it('should use the name as surnames if just one word is used as fullname', () => {
    const result = asNameAndSurnames('kristinlustig');
    expect(result).toStrictEqual(['kristinlustig', 'kristinlustig']);
  });

  it('should separate names even if multiple spaces are used', () => {
    const result = asNameAndSurnames(' Thomas   J.   McKenzy ');
    expect(result).toStrictEqual(['Thomas J.', 'McKenzy']);
  });
});
