import { Context } from "..";

interface CanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return {
      userErrors: [
        {
          message: "Post not found",
        },
      ],
      post: null,
    };
  }

  if (post.authorId !== userId) {
    return {
      userErrors: [
        {
          message: "You must be the author to update a post",
        },
      ],
      post: null,
    };
  }
};
