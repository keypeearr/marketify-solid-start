import { prisma } from "~/lib/db/db";
import { UserCreateInput } from "~/generated/prisma/models";
import { UserAlreadyExistsError } from "~/lib/errors/userErrors";
import { Prisma, User } from "~/generated/prisma/client";

export const userRepository = {
  async createUser(data: UserCreateInput): Promise<User> {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new UserAlreadyExistsError();
        }
      }
      throw err;
    }
  },
};
