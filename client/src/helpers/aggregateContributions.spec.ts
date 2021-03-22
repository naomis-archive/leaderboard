import { aggregateContribs } from './aggregateContributions';

describe('aggregateContributions', () => {
  const mockData = {
    crowdin: 1000,
    forum: 1000,
    github: 1000,
    news: 1000,
  };

  const zeroData = {
    crowdin: 0,
    forum: 0,
    github: 0,
    news: 0,
  };

  const randData = {
    crowdin: 7432,
    forum: 555,
    github: 12,
    news: 0,
  };

  it('should handle mock data correctly', () => {
    const aggregate = aggregateContribs(
      mockData.crowdin,
      mockData.forum,
      mockData.github,
      mockData.news
    );
    expect(aggregate).toEqual(110110);
  });

  it('should handle zero values correctly', () => {
    const aggregate = aggregateContribs(
      zeroData.crowdin,
      zeroData.forum,
      zeroData.github,
      zeroData.news
    );
    expect(aggregate).toEqual(0);
  });

  it('should handle realistic data correctly', () => {
    const aggregate = aggregateContribs(
      randData.crowdin,
      randData.forum,
      randData.github,
      randData.news
    );
    expect(aggregate).toEqual(249);
  });
});
