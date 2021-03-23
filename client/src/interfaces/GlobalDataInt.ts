/* eslint-disable @typescript-eslint/naming-convention */
export interface CrowdinDataInt {
  name: string;
  username: string;
  languages: string[];
  translations: number;
  avatar: string;
}

export interface ForumDataInt {
  username: string;
  name: string;
  likes: number;
  liked: number;
  avatar: string;
  url: string;
}

export interface GithubDataInt {
  username: string;
  name: string;
  commits: number;
  avatar: string;
  url: string;
}

export interface NewsDataInt {
  name: string;
  username: string;
  url: string;
  avatar: string;
  posts: number;
}
export interface GlobalDataInt {
  crowdin: CrowdinDataInt[];
  forum: ForumDataInt[];
  github: GithubDataInt[];
  news: NewsDataInt[];
  updated_on: string;
}
