import {InterestingFact} from '../models/interestingFact';

export const stripString = (input = ''): string => {
  return (
    input
      // .replace(/[\r\n]+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
};

export const stringToInterestingFacts = (input = ''): InterestingFact[] => {
  if (input === '') {
    return [];
  }

  return input
    .split('•')
    .filter((factNode) => factNode.includes(':'))
    .map((factNode) => {
      const [topic, fact] = factNode.split(':');

      return {
        topic: topic.trim(),
        fact: fact.trim(),
      };
    });
};
