import chai, { assert } from "chai";
import http from "chai-http";
import UserModel from "../../data/models/UserModel";
import { API } from "../../index";

chai.use(http);

const mockData = {
  username: "nhcarrigan",
  password: "testing",
  avatar: "https://google.com",
  crowdin: "nhcarrigan",
  forum: "nhcarrigan",
  github: "nhcarrigan",
  news: "nhcarrigan",
};

const updatedData = {
  username: "nhcarrigan",
  password: "testing",
  crowdin: "better crowdin",
};

suite("User Route", () => {
  test("should return correct data on post", async () => {
    const response = await chai.request(API).post("/user").send(mockData);
    const actualData = response.body;
    assert.equal(response.status, 200, "does not return status 200");
    assert.equal(
      actualData.username,
      mockData.username,
      "does not send back correct username"
    );
    assert.equal(
      actualData.avatar,
      mockData.avatar,
      "does not send back correct avatar"
    );
    assert.equal(
      actualData.crowdin.words,
      1,
      "did not send back correct crowdin words"
    );
    assert.equal(
      actualData.crowdin.approvals,
      5,
      "did not send back correct crowdin approvals"
    );
    assert.equal(
      actualData.crowdin.votes,
      3,
      "did not send back correct crowdin votes"
    );
    assert.equal(
      actualData.forum.likes,
      20,
      "did not send back correct forum likes"
    );
    assert.equal(
      actualData.forum.replies,
      50,
      "did not send back correct forum replies"
    );
    assert.equal(
      actualData.forum.topics,
      10,
      "did not send back correct forum topics"
    );
    assert.equal(
      actualData.github.commits,
      39,
      "did not send back correct github commits"
    );
    assert.equal(
      actualData.github.issues,
      3,
      "did not send back correct github issues"
    );
    assert.equal(
      actualData.github.pulls,
      1,
      "did not send back correct github pulls"
    );
    assert.equal(
      actualData.news.posts,
      3,
      "did not send back correct news posts"
    );
    assert.equal(
      actualData.aggregate,
      1127,
      "did not send back correct aggregate score"
    );
  });

  test("should return correct updated data on post", async () => {
    const response = await chai.request(API).post("/user").send(updatedData);
    const actualData = response.body;
    assert.equal(response.status, 200, "does not return status 200");
    assert.equal(
      actualData.username,
      updatedData.username,
      "does not send back correct username"
    );
    assert.equal(
      actualData.avatar,
      mockData.avatar,
      "does not send back correct avatar"
    );
    assert.equal(
      actualData.crowdin.words,
      0,
      "did not send back correct crowdin words"
    );
    assert.equal(
      actualData.crowdin.approvals,
      0,
      "did not send back correct crowdin approvals"
    );
    assert.equal(
      actualData.crowdin.votes,
      0,
      "did not send back correct crowdin votes"
    );
    assert.equal(
      actualData.forum.likes,
      20,
      "did not send back correct forum likes"
    );
    assert.equal(
      actualData.forum.replies,
      50,
      "did not send back correct forum replies"
    );
    assert.equal(
      actualData.forum.topics,
      10,
      "did not send back correct forum topics"
    );
    assert.equal(
      actualData.github.commits,
      39,
      "did not send back correct github commits"
    );
    assert.equal(
      actualData.github.issues,
      3,
      "did not send back correct github issues"
    );
    assert.equal(
      actualData.github.pulls,
      1,
      "did not send back correct github pulls"
    );
    assert.equal(
      actualData.news.posts,
      3,
      "did not send back correct news posts"
    );
    assert.equal(
      actualData.aggregate,
      1127,
      "did not send back correct aggregate score"
    );
  });
});
