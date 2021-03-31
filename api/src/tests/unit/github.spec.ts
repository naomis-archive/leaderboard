import { assert } from "chai";
import { compileCommits } from "../../controllers/github/modules/compileCommits";
import { GithubContribInt } from "../../interfaces/github/GithubContribInt";
import { RawCommitInt } from "../../interfaces/github/RawCommitInt";

const mockGithubData: RawCommitInt[] = [
  {
    sha: "bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    node_id:
      "MDY6Q29tbWl0Mjc5NjU3NTk0OmJkYzE1ZTE2OGY1MmM3MWI1MTU3ZWQyMWFjYTgzM2RjZDU0NTZjNWQ=",
    commit: {
      author: {
        name: "Nicholas Carrigan (he/him)",
        email: "nhcarrigan@gmail.com",
        date: "2021-02-19T22:16:27Z",
      },
      committer: {
        name: "GitHub",
        email: "noreply@github.com",
        date: "2021-02-19T22:16:27Z",
      },
      message:
        "Merge pull request #8 from nhcarrigan/feat/add-archive\n\ndocs: section on old projects",
      tree: {
        sha: "53efcfd645cf24dfb9b2517b3dd658eb2a3664e1",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/git/trees/53efcfd645cf24dfb9b2517b3dd658eb2a3664e1",
      },
      url:
        "https://api.github.com/repos/nhcarrigan/nhcarrigan/git/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
      comment_count: 0,
      verification: {
        verified: true,
        reason: "valid",
        signature:
          "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJgMDi7CRBK7hj4Ov3rIwAAdHIIACKFveVwhmS0hcHweqvzLSlj\nfclJ/PdfOYu6rSbnTQ0tRa0haYvSI4X6p7WnuRjWiFaxwCfJvMWpc6j7W3vt8Y9q\nHiTtE5llIU3DMuMLe9hS9GBE9TWSs+uh06GEI0YL+AejdnMkwonapxRYc5bTAQJv\nywJTFGYMgmCZ103FHjQoP/JrB3Symq7U5C3sfJ/mLwhn+GbwsxPAVRPEDpjSQdUU\nY7SR0mFC4nCIXJbGuPkiKAQxnZl8yaAKeA4ZxuJmEsJEL4B7/t4Gb8ygXfBl/x37\nF+q9GqErisL9V8haZVY3ZG7UUlGHEK3YsCaR3LWulgVeEZZwb015Sw+Da9rGfXc=\n=jmdj\n-----END PGP SIGNATURE-----\n",
        payload:
          "tree 53efcfd645cf24dfb9b2517b3dd658eb2a3664e1\nparent 3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933\nparent 4e524c71c2b1b2a132e075b24cf3b6503b3e3789\nauthor Nicholas Carrigan (he/him) <nhcarrigan@gmail.com> 1613772987 -0800\ncommitter GitHub <noreply@github.com> 1613772987 -0800\n\nMerge pull request #8 from nhcarrigan/feat/add-archive\n\ndocs: section on old projects",
      },
    },
    url:
      "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    html_url:
      "https://github.com/nhcarrigan/nhcarrigan/commit/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    comments_url:
      "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d/comments",
    author: {
      login: "nhcarrigantest",
      id: 63889819,
      node_id: "MDQ6VXNlcjYzODg5ODE5",
      avatar_url: "https://avatars.githubusercontent.com/u/63889819?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/nhcarrigan",
      html_url: "https://github.com/nhcarrigan",
      followers_url: "https://api.github.com/users/nhcarrigan/followers",
      following_url:
        "https://api.github.com/users/nhcarrigan/following{/other_user}",
      gists_url: "https://api.github.com/users/nhcarrigan/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/nhcarrigan/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/nhcarrigan/subscriptions",
      organizations_url: "https://api.github.com/users/nhcarrigan/orgs",
      repos_url: "https://api.github.com/users/nhcarrigan/repos",
      events_url: "https://api.github.com/users/nhcarrigan/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/nhcarrigan/received_events",
      type: "User",
      site_admin: false,
    },
    committer: {
      login: "web-flow",
      id: 19864447,
      node_id: "MDQ6VXNlcjE5ODY0NDQ3",
      avatar_url: "https://avatars.githubusercontent.com/u/19864447?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/web-flow",
      html_url: "https://github.com/web-flow",
      followers_url: "https://api.github.com/users/web-flow/followers",
      following_url:
        "https://api.github.com/users/web-flow/following{/other_user}",
      gists_url: "https://api.github.com/users/web-flow/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/web-flow/subscriptions",
      organizations_url: "https://api.github.com/users/web-flow/orgs",
      repos_url: "https://api.github.com/users/web-flow/repos",
      events_url: "https://api.github.com/users/web-flow/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/web-flow/received_events",
      type: "User",
      site_admin: false,
    },
    parents: [
      {
        sha: "3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
        html_url:
          "https://github.com/nhcarrigan/nhcarrigan/commit/3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
      },
      {
        sha: "4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
        html_url:
          "https://github.com/nhcarrigan/nhcarrigan/commit/4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
      },
    ],
  },
  {
    sha: "bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    node_id:
      "MDY6Q29tbWl0Mjc5NjU3NTk0OmJkYzE1ZTE2OGY1MmM3MWI1MTU3ZWQyMWFjYTgzM2RjZDU0NTZjNWQ=",
    commit: {
      author: {
        name: "Nicholas Carrigan (he/him)",
        email: "nhcarrigan@gmail.com",
        date: "2021-02-19T22:16:27Z",
      },
      committer: {
        name: "GitHub",
        email: "noreply@github.com",
        date: "2021-02-19T22:16:27Z",
      },
      message:
        "Merge pull request #8 from nhcarrigan/feat/add-archive\n\ndocs: section on old projects",
      tree: {
        sha: "53efcfd645cf24dfb9b2517b3dd658eb2a3664e1",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/git/trees/53efcfd645cf24dfb9b2517b3dd658eb2a3664e1",
      },
      url:
        "https://api.github.com/repos/nhcarrigan/nhcarrigan/git/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
      comment_count: 0,
      verification: {
        verified: true,
        reason: "valid",
        signature:
          "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJgMDi7CRBK7hj4Ov3rIwAAdHIIACKFveVwhmS0hcHweqvzLSlj\nfclJ/PdfOYu6rSbnTQ0tRa0haYvSI4X6p7WnuRjWiFaxwCfJvMWpc6j7W3vt8Y9q\nHiTtE5llIU3DMuMLe9hS9GBE9TWSs+uh06GEI0YL+AejdnMkwonapxRYc5bTAQJv\nywJTFGYMgmCZ103FHjQoP/JrB3Symq7U5C3sfJ/mLwhn+GbwsxPAVRPEDpjSQdUU\nY7SR0mFC4nCIXJbGuPkiKAQxnZl8yaAKeA4ZxuJmEsJEL4B7/t4Gb8ygXfBl/x37\nF+q9GqErisL9V8haZVY3ZG7UUlGHEK3YsCaR3LWulgVeEZZwb015Sw+Da9rGfXc=\n=jmdj\n-----END PGP SIGNATURE-----\n",
        payload:
          "tree 53efcfd645cf24dfb9b2517b3dd658eb2a3664e1\nparent 3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933\nparent 4e524c71c2b1b2a132e075b24cf3b6503b3e3789\nauthor Nicholas Carrigan (he/him) <nhcarrigan@gmail.com> 1613772987 -0800\ncommitter GitHub <noreply@github.com> 1613772987 -0800\n\nMerge pull request #8 from nhcarrigan/feat/add-archive\n\ndocs: section on old projects",
      },
    },
    url:
      "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    html_url:
      "https://github.com/nhcarrigan/nhcarrigan/commit/bdc15e168f52c71b5157ed21aca833dcd5456c5d",
    comments_url:
      "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/bdc15e168f52c71b5157ed21aca833dcd5456c5d/comments",
    author: {
      login: "nhcarrigan",
      id: 63889819,
      node_id: "MDQ6VXNlcjYzODg5ODE5",
      avatar_url: "https://avatars.githubusercontent.com/u/63889819?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/nhcarrigan",
      html_url: "https://github.com/nhcarrigan",
      followers_url: "https://api.github.com/users/nhcarrigan/followers",
      following_url:
        "https://api.github.com/users/nhcarrigan/following{/other_user}",
      gists_url: "https://api.github.com/users/nhcarrigan/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/nhcarrigan/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/nhcarrigan/subscriptions",
      organizations_url: "https://api.github.com/users/nhcarrigan/orgs",
      repos_url: "https://api.github.com/users/nhcarrigan/repos",
      events_url: "https://api.github.com/users/nhcarrigan/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/nhcarrigan/received_events",
      type: "User",
      site_admin: false,
    },
    committer: {
      login: "web-flow",
      id: 19864447,
      node_id: "MDQ6VXNlcjE5ODY0NDQ3",
      avatar_url: "https://avatars.githubusercontent.com/u/19864447?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/web-flow",
      html_url: "https://github.com/web-flow",
      followers_url: "https://api.github.com/users/web-flow/followers",
      following_url:
        "https://api.github.com/users/web-flow/following{/other_user}",
      gists_url: "https://api.github.com/users/web-flow/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/web-flow/subscriptions",
      organizations_url: "https://api.github.com/users/web-flow/orgs",
      repos_url: "https://api.github.com/users/web-flow/repos",
      events_url: "https://api.github.com/users/web-flow/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/web-flow/received_events",
      type: "User",
      site_admin: false,
    },
    parents: [
      {
        sha: "3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
        html_url:
          "https://github.com/nhcarrigan/nhcarrigan/commit/3bd1fa6382fb416a3e6d11d2a1c1c47cc7817933",
      },
      {
        sha: "4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
        url:
          "https://api.github.com/repos/nhcarrigan/nhcarrigan/commits/4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
        html_url:
          "https://github.com/nhcarrigan/nhcarrigan/commit/4e524c71c2b1b2a132e075b24cf3b6503b3e3789",
      },
    ],
  },
];

const expectedResult: GithubContribInt[] = [
  {
    username: "nhcarrigantest",
    name: "Nicholas Carrigan (he/him)",
    commits: 1,
    issues: 0,
    pulls: 0,
    avatar: "https://avatars.githubusercontent.com/u/63889819?v=4",
    url: "https://github.com/nhcarrigan",
  },
];

suite("Github modules", () => {
  test("should parse Github data correctly", async () => {
    const result = await compileCommits(mockGithubData);
    assert.deepEqual(
      result[0],
      expectedResult[0],
      "did not parse Github data correctly"
    );
  });

  test("should filter out staff data", async () => {
    const result = await compileCommits(mockGithubData);
    const staff = result.find((el) => el.username === "nhcarrigan");
    assert.isUndefined(staff, "did not filter out staff data");
  });
});
