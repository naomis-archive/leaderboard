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
  crowdin: string;
  forum: string;
  github: string;
  news: string;
}

export interface ParsedUserInt {
  username: string;
  aggregate: number;
  avatar: string;
}
