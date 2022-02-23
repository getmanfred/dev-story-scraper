import {InterestingFact} from '../models/interestingFact';

export class InterestingFactsParser {
  static parse(input = ''): InterestingFact[] {
    if (input === '') {
      return [];
    }

    return input
      .split('•')
      .filter((factNode) => factNode.includes(':'))
      .map((factNode) => this.factNodeAsInterestingFact(factNode));
  }

  private static factNodeAsInterestingFact(factNode: string): InterestingFact {
    const [topic, fact] = factNode.split(':');

    return {
      topic: topic.trim(),
      fact: fact.trim(),
    };
  }
}
