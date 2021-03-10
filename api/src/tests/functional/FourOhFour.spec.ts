import chai, { assert } from "chai";
import http from "chai-http";
import { API } from "../../index";

chai.use(http);

suite("Random path", () => {
  test("should return 404 error", async () => {
    const response = await chai.request(API).get("/fake-path-does-not-work");
    assert.equal(response.status, 404, "did not send 404 status");
    assert.deepEqual(
      response.body,
      { error: "Route not found." },
      "did not send error object"
    );
  });
});
