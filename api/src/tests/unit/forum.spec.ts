import { assert } from "chai";
import { compileForumData } from "../../controllers/forum/modules/compileForumData";
import { ForumContribInt } from "../../interfaces/forum/ForumContribInt";
import { ForumDataInt } from "../../interfaces/forum/ForumDataInt";

const mockForumData: ForumDataInt = {
  directory_items: [
    {
      id: 12,
      likes_received: 100,
      likes_given: 1000,
      topics_entered: 3,
      post_count: 3,
      posts_read: 3,
      days_visited: 3,
      user: {
        id: 1222,
        username: "nhcarrigantest",
        name: "Nicholas Carrigan",
        avatar_template:
          "/user_avatar/forum.freecodecamp.org/nhcarrigan/{size}/185808_2.png",
        title: "Open sourcerer",
      },
    },
  ],
  meta: {
    last_updated_at: "Right Meow",
    total_rows_directory_items: 12,
    load_more_directory_items: "no",
  },
};

const mockResult: ForumContribInt[] = [
  {
    username: "nhcarrigantest",
    name: "Nicholas Carrigan",
    likes: 100,
    liked: 1000,
    avatar:
      "https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/nhcarrigan/240/185808_2.png",
    url: "https://forum.freecodecamp.org/u/nhcarrigantest",
  },
];

suite("Forum modules", () => {
  test("should parse data correctly", async () => {
    const result = await compileForumData(mockForumData);
    assert.deepEqual(
      result[0],
      mockResult[0],
      "did not parse forum data correctly"
    );
  });
});
