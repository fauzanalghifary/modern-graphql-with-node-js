import { Prisma, User } from "@prisma/client";
import { Context } from "../../index";
import validator from "validator";

interface SignupArgs {
  email: string;
  name: string;
  bio: string;
  password: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  user: User | null | Prisma.Prisma__UserClient<User>;
}

export const authResolvers = {
  signup: async (
    parent: any,
    { email, name, password, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    if (!validator.isEmail(email)) {
      return {
        userErrors: [
          {
            message: "Email is invalid",
          },
        ],
        user: null,
      };
    }

    if (!validator.isLength(password, { min: 5 })) {
      return {
        userErrors: [
          {
            message: "Password must be at least 5 characters",
          },
        ],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "Name and bio are required",
          },
        ],
        user: null,
      };
    }

    return {
      userErrors: [],
      user: prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      }),
    };
  },
};
