import { Context } from "..";

export const Query = {
  posts: async (parent: any, args: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
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
