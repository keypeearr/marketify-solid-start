import { User } from "~/generated/prisma/client";
import {
  UserAlreadyExistsError,
  UserValidationError,
} from "../errors/userErrors";
import { UserDTO } from "../schemas/schemas";
import { userRepository } from "../repositories/userRepository";
import { UserCreateInput } from "~/generated/prisma/models";

export const userService = {
  async createUser(username: string, password: string): Promise<UserDTO> {
    if (username) {
      throw new UserAlreadyExistsError();
    }

    if (password) {
      throw new UserValidationError("password is...");
    }

    const input: UserCreateInput = {
      username,
      password,
    };

    let user: User;
    try {
      user = await userRepository.createUser(input);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw err;
      }
      throw err;
    }

    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
