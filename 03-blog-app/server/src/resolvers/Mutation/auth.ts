import { Prisma, User } from "@prisma/client";
import { Context } from "../../index";
import validator from "validator";
import { compare, hash } from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../keys";

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface SigninArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    parent: any,
    { credentials, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    if (!validator.isEmail(email)) {
      return {
        userErrors: [
          {
            message: "Email is invalid",
          },
        ],
        token: null,
      };
    }

    if (!validator.isLength(password, { min: 5 })) {
      return {
        userErrors: [
          {
            message: "Password must be at least 5 characters",
          },
        ],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "Name and bio are required",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const token = await JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
      expiresIn: "3600000",
    });

    return {
      userErrors: [],
      token,
    };
  },
  signin: async (
    parent: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }

    const token = await JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
      expiresIn: "3600000",
    });

    return {
      userErrors: [],
      token,
    };
  },
};
