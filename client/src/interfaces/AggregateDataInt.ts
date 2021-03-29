export interface AggregateDataInt {
  data: {
    username: string;
    aggregate: number;
    avatar: string;
    crowdin: {
      words: number;
    };
    forum: {
      likes: number;
    };
    github: {
      commits: number;
    };
    news: {
      posts: number;
    };
  }[];
  updated: string;
}
