import { AggregateDataInt } from 'src/interfaces/AggregateDataInt';

export const testAggregateData: AggregateDataInt = {
  updated: '1617045844967',
  data: [
    {
      username: 'testing',
      aggregate: 300,
      avatar: 'https://google.com',
      crowdin: {
        words: 2,
        approvals: 3,
        votes: 1,
      },
      forum: {
        likes: 1,
        topics: 2,
        replies: 3,
      },
      github: {
        commits: 12,
        issues: 1,
        pulls: 3,
      },
      news: {
        posts: 1,
      },
    },
  ],
};
