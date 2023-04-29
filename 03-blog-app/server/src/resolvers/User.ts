import { Context } from "..";

interface UserParentType {
  id: number;
}

export const User = {
  posts: async (
    parent: UserParentType,
    args: any,
    { prisma, userInfo }: Context
  ) => {
    const isOwnProfile = userInfo && userInfo.userId === parent.id;

    if (isOwnProfile) {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    } else {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }
  },
};
