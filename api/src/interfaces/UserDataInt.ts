export interface UserDataInt {
  username: string;
  password: string;
  avatar: string;
  newUsername?: string;
  crowdin: string;
  forum: string;
  github: string;
  news: string;
}

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
      issues: number;
      pulls: number;
    };
    news: {
      posts: number;
    };
  }[];
  updated: string;
}
