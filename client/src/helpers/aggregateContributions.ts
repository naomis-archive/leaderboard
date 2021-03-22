export const aggregateContribs = (
  crowdin: string,
  forum: string,
  github: string,
  news: string
): number => {
  let aggregate = 0;

  const parsedCrowdin = parseInt(crowdin, 10);
  const parsedForum = parseInt(forum, 10);
  const parsedGithub = parseInt(github, 10);
  const parsedNews = parseInt(news, 10);

  if (!isNaN(parsedCrowdin)) {
    // one point for every 100 words translated?
    const crowdinScore = Math.floor(parsedCrowdin / 100);
    aggregate += crowdinScore;
  }

  if (!isNaN(parsedForum)) {
    // one point for every 10 likes?
    const forumScore = Math.floor(parsedForum / 10);
    aggregate += forumScore;
  }

  if (!isNaN(parsedGithub)) {
    // ten points for every commit?
    const githubScore = parsedGithub * 10;
    aggregate += githubScore;
  }

  if (!isNaN(parsedNews)) {
    // one hundred points for each article?
    const newsScore = parsedNews * 100;
    aggregate += newsScore;
  }

  return aggregate;
};
