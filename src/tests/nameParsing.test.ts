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

  it('should not break with wrong input', () => {
    const result = asNameAndSurnames('345');
    expect(result).toStrictEqual(['', '']);
  });

  it('should separate names with just initial letter', () => {
    const result = asNameAndSurnames('T. J. Crowder');
    expect(result).toStrictEqual(['T. J.', 'Crowder']);
  });
});
