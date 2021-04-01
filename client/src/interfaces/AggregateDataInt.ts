export interface AggregateDataInt {
  data: AggregateUserInt[];
  updated: string;
}

export interface AggregateUserInt {
  username: string;
  aggregate: number;
  avatar: string;
  crowdin: {
    words: number;
    approvals: number;
    votes: number;
  };
  forum: {
    likes: number;
    topics: number;
    replies: number;
  };
  github: {
    commits: number;
    issues: number;
    pulls: number;
  };
  news: {
    posts: number;
  };
}
