import { Context } from "..";

export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: Context) => {
    if (!userInfo) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });

    return user;
  },
  profile: async (
    parent: any,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    const isMyProfile = Number(userId) === userInfo?.userId;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
      // no need to create Profile Resolver. Prisma will automatically create a Profile resolver for us
      include: {
        user: true,
      },
    });

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      isMyProfile,
    };
  },
  posts: async (parent: any, args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          title: "asc",
        },
      ],
    });
    return posts;
  },
};
