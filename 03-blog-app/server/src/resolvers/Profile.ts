import { Context } from "..";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (
    parent: ProfileParentType,
    args: any,
    { prisma, userInfo }: Context
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });

    return user;
  },
};
