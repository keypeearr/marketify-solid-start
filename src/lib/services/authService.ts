import { signupSchema, UserDTO } from "../schemas/schemas";
import {
  UserAlreadyExistsError,
  UserValidationError,
} from "../errors/userErrors";
import { userRepository } from "../repositories/userRepository";

export const authService = {
  async login() {},

  async register(
    username: string,
    password: string,
    confirmPassword: string,
  ): Promise<UserDTO> {
    const result = signupSchema.safeParse({
      username,
      password,
      confirmPassword,
    });

    if (!result.success) {
      let error = result.error.issues[0];
      let message = `[${error.path}] ${error.message.toLowerCase()}`;
      throw new UserValidationError(message);
    }

    let user;
    try {
      const createdUser = await userRepository.createUser({
        username,
        password,
      });
      user = {
        ...createdUser,
      };
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) throw err;

      throw err;
    }

    return user as UserDTO;
  },
};
