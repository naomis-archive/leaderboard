import chai, { assert } from "chai";
import http from "chai-http";
import { API } from "../../index";
import { ContribDataInt } from "../../interfaces/ContribDataInt";

chai.use(http);

const expectedData: ContribDataInt = {
  crowdin: [
    {
      name: "Nicholas Carrigan",
      username: "nhcarrigan",
      languages: ["English"],
      translations: 1,
      avatar:
        "https://production-enterprise-static.downloads.crowdin.com/avatar/232/medium/6ac64de32f21629b968e8a3a55d76a69.jpg",
    },
  ],
  forum: [
    {
      username: "nhcarrigan",
      name: "Nicholas Carrigan",
      likes: 20,
      liked: 5,
      avatar:
        "https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/nhcarrigan/240/185808_2.png",
      url: "https://forum.freecodecamp.org/u/nhcarrigan",
    },
  ],
  github: [
    {
      username: "nhcarrigan",
      name: "Nicholas Carrigan",
      commits: 39,
      avatar: "https://avatars.githubusercontent.com/u/63889819?v=4",
      url: "https://github.com/nhcarrigan",
    },
  ],
  news: [
    {
      name: "Nicholas Carrigan",
      username: "nhcarrigan",
      url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
      avatar:
        "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
      posts: 3,
    },
  ],
  updated_on: new Date(Date.now()),
};

suite("get-data path", () => {
  test("should return 200 status", async () => {
    const response = await chai.request(API).get("/get-data");
    assert.equal(response.status, 200, "did not send 200 status");
  });

  test("should send data with correct properties", async () => {
    const response = await chai.request(API).get("/get-data");
    const data = response.body;
    assert.property(data, "crowdin", "missing crowdin property");
    assert.property(data, "forum", "missing forum property");
    assert.property(data, "github", "missing github property");
    assert.property(data, "news", "missing news property");
    assert.property(data, "updated_on", "missing updated_on property");
  });

  test("should have expected crowdin data", async () => {
    const response = await chai.request(API).get("/get-data");
    const data: ContribDataInt = response.body;
    assert.deepEqual(
      data.crowdin,
      expectedData.crowdin,
      "did not send correct crowdin data"
    );
  });

  test("should have expected forum data", async () => {
    const response = await chai.request(API).get("/get-data");
    const data: ContribDataInt = response.body;
    assert.deepEqual(
      data.forum,
      expectedData.forum,
      "did not send correct forum data"
    );
  });

  test("should have expected github data", async () => {
    const response = await chai.request(API).get("/get-data");
    const data: ContribDataInt = response.body;
    assert.deepEqual(
      data.github,
      expectedData.github,
      "did not send correct github data"
    );
  });

  test("should have expected news data", async () => {
    const response = await chai.request(API).get("/get-data");
    const data: ContribDataInt = response.body;
    assert.deepEqual(
      data.news,
      expectedData.news,
      "did not send correct news data"
    );
  });

  test("should have expected updated_on value", async () => {
    const response = await chai.request(API).get("/get-data");
    const data: ContribDataInt = response.body;
    assert.approximately(
      new Date(data.updated_on).getTime(),
      new Date(expectedData.updated_on).getTime(),
      1000
    );
  });
});
