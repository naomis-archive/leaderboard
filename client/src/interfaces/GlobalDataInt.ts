export interface GlobalDataInt {
  crowdin: {
    name: string;
    languages: string[];
    translations: number;
    avatar: string;
  }[];
  forum: {
    username: string;
    name: string;
    likes: number;
    liked: number;
    avatar: string;
    url: string;
  }[];
  github: {
    username: string;
    name: string;
    commits: number;
    avatar: string;
    url: string;
  }[];
  news: {
    name: string;
    username: string;
    url: string;
    avatar: string;
    posts: number;
  }[];
  updated_on: Date;
}
