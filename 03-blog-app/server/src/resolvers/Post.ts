import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorId: number;
  bio: string;
  userId: number;
}

export const Post = {
  user: async (parent: PostParentType, args: any, { prisma }: Context) => {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });

    // return user;
    return userLoader.load(parent.authorId);
  },
};
