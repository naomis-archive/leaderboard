import { ForumContribInt } from "../../../interfaces/forum/ForumContribInt";
import { ForumDataInt } from "../../../interfaces/forum/ForumDataInt";

export const compileForumData = async (
  data: ForumDataInt
): Promise<ForumContribInt[]> => {
  const finalData: ForumContribInt[] = [];

  const userList = data.directory_items;

  for (const user of userList) {
    const parsedAvatarString =
      "https://sjc1.discourse-cdn.com/freecodecamp" +
      user.user.avatar_template.replace("{size}", "240");
    const properData: ForumContribInt = {
      username: user.user.username,
      name: user.user.name,
      likes: user.likes_received,
      liked: user.likes_given,
      avatar: parsedAvatarString,
      url: `https://forum.freecodecamp.org/u/${user.user.username}`,
    };

    finalData.push(properData);
  }

  return finalData.filter((user) => user.likes > 0);
};
