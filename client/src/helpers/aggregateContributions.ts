export const aggregateContribs = (
  crowdin: number,
  forum: number,
  github: number,
  news: number
): number => {
  let aggregate = 0;

  // one point for every 100 words translated?
  const crowdinScore = Math.floor(crowdin / 100);
  aggregate += crowdinScore;

  // one point for every 10 likes?
  const forumScore = Math.floor(forum / 10);
  aggregate += forumScore;

  // ten points for every commit?
  const githubScore = github * 10;
  aggregate += githubScore;

  // one hundred points for each article?
  const newsScore = news * 100;
  aggregate += newsScore;

  return aggregate;
};
