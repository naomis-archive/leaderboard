import { GlobalDataInt } from 'src/interfaces/GlobalDataInt';

/* eslint-disable @typescript-eslint/naming-convention */
const testCrowdinData = [
  {
    name: 'Nicholas Carrigan',
    languages: ['English'],
    translations: 1,
    avatar:
      'https://production-enterprise-static.downloads.crowdin.com/avatar/232/medium/6ac64de32f21629b968e8a3a55d76a69.jpg',
  },
];

const testForumData = [
  {
    username: 'nhcarrigan',
    name: 'Nicholas Carrigan',
    likes: 20,
    liked: 5,
    avatar:
      'https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/nhcarrigan/240/185808_2.png',
    url: 'https://forum.freecodecamp.org/u/nhcarrigan',
  },
];

const testGithubData = [
  {
    username: 'nhcarrigan',
    name: 'Nicholas Carrigan',
    commits: 39,
    avatar: 'https://avatars.githubusercontent.com/u/63889819?v=4',
    url: 'https://github.com/nhcarrigan',
  },
];

const testNewsData = [
  {
    name: 'Nicholas Carrigan',
    username: 'nhcarrigan',
    url: 'https://www.freecodecamp.org/news/author/nhcarrigan/',
    avatar:
      'https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg',
    posts: 3,
  },
];

export const testData: GlobalDataInt = {
  crowdin: testCrowdinData,
  forum: testForumData,
  github: testGithubData,
  news: testNewsData,
  updated_on: 'Tue Mar 16 2021 18:06:15 GMT-0700 (Pacific Daylight Time)',
};
