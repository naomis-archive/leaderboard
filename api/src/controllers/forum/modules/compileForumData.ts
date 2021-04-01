import { forumStaffList } from "../../../config/staffList";
import { ForumContribInt } from "../../../interfaces/forum/ForumContribInt";
import { ForumDataInt } from "../../../interfaces/forum/ForumDataInt";
import { errorHandler } from "../../../utils/errorHandler";

export const compileForumData = async (
  data: ForumDataInt
): Promise<ForumContribInt[]> => {
  try {
    const finalData: ForumContribInt[] = [];

    const userList = data.directory_items;

    for (const user of userList) {
      if (forumStaffList.includes(user.user.username)) {
        continue;
      }
      const parsedAvatarString =
        "https://sjc1.discourse-cdn.com/freecodecamp" +
        user.user.avatar_template.replace("{size}", "240");

      const properData: ForumContribInt = {
        username: user.user.username,
        name: user.user.name,
        likes: user.likes_received,
        replies: user.post_count,
        topics: user.topic_count,
        avatar: parsedAvatarString,
        url: `https://forum.freecodecamp.org/u/${user.user.username}`,
      };

      finalData.push(properData);
    }

    return finalData
      .filter((user) => user.likes > 0)
      .sort((a, b) => b.likes - a.likes);
  } catch (error) {
    errorHandler("Forum: Compile Forum Data", error);
    process.exit(1);
  }
};
