import chai, { assert } from "chai";
import http from "chai-http";
import UserModel, { UserInt } from "../../data/models/UserModel";
import { API } from "../../index";

chai.use(http);

const mockData = {
  username: "unit testing",
  avatar: "https://google.com",
  crowdin: "unit testing crowdin",
  forum: "unit testing forum",
  github: "unit testing github",
  news: "unit testing news",
};

const updatedData = {
  username: "unit testing",
  newUsername: "better unit testing",
  crowdin: "better crowdin",
};

let cleanupId = "";

suite("User Route", () => {
  test("should return correct data on post", async () => {
    const response = await chai.request(API).post("/user").send(mockData);
    const actualData = response.body;
    cleanupId = response.body._id;
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
      actualData.crowdin,
      mockData.crowdin,
      "does not send back correct crowdin"
    );
    assert.equal(
      actualData.forum,
      mockData.forum,
      "does not send back correct forum"
    );
    assert.equal(
      actualData.github,
      mockData.github,
      "does not send back correct github"
    );
    assert.equal(
      actualData.news,
      mockData.news,
      "does not send back correct news"
    );
  });

  test("should return correct saved data on get", async () => {
    const response = await chai.request(API).get("/user");
    const actualData = response.body[0];
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
      actualData.crowdin,
      mockData.crowdin,
      "does not send back correct crowdin"
    );
    assert.equal(
      actualData.forum,
      mockData.forum,
      "does not send back correct forum"
    );
    assert.equal(
      actualData.github,
      mockData.github,
      "does not send back correct github"
    );
    assert.equal(
      actualData.news,
      mockData.news,
      "does not send back correct news"
    );
  });

  test("should return correct updated data on post", async () => {
    const response = await chai.request(API).post("/user").send(updatedData);
    const actualData = response.body;
    assert.equal(response.status, 200, "does not return status 200");
    assert.equal(
      actualData.username,
      updatedData.newUsername,
      "does not send back correct username"
    );
    assert.equal(
      actualData.avatar,
      mockData.avatar,
      "does not send back correct avatar"
    );
    assert.equal(
      actualData.crowdin,
      updatedData.crowdin,
      "does not send back correct crowdin"
    );
    assert.equal(
      actualData.forum,
      mockData.forum,
      "does not send back correct forum"
    );
    assert.equal(
      actualData.github,
      mockData.github,
      "does not send back correct github"
    );
    assert.equal(
      actualData.news,
      mockData.news,
      "does not send back correct news"
    );
  });

  test("should return saved and updated data on get", async () => {
    const response = await chai.request(API).get("/user");
    const actualData = response.body.find(
      (el: UserInt) => el._id === cleanupId
    );
    assert.equal(response.status, 200, "does not return status 200");
    assert.equal(
      actualData.username,
      updatedData.newUsername,
      "does not send back correct username"
    );
    assert.equal(
      actualData.avatar,
      mockData.avatar,
      "does not send back correct avatar"
    );
    assert.equal(
      actualData.crowdin,
      updatedData.crowdin,
      "does not send back correct crowdin"
    );
    assert.equal(
      actualData.forum,
      mockData.forum,
      "does not send back correct forum"
    );
    assert.equal(
      actualData.github,
      mockData.github,
      "does not send back correct github"
    );
    assert.equal(
      actualData.news,
      mockData.news,
      "does not send back correct news"
    );
  });

  test("clean up data...", async () => {
    await UserModel.deleteOne({ _id: cleanupId });
    const response = await chai.request(API).get("/user");
    assert.equal(response.body.length, 0, "did not clear test data");
  });
});
