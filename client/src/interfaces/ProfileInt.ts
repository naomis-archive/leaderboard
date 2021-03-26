export interface UserFormInt {
  username: string;
  newUsername: string;
  crowdin: string;
  forum: string;
  github: string;
  news: string;
}

export interface UserDataInt {
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
}
