import { signupSchema, UserDTO } from "../schemas/schemas";
import {
  UserAlreadyExistsError,
  UserValidationError,
} from "../errors/userErrors";
import { userRepository } from "../repositories/userRepository";
import { hashPassword } from "../utilities/password";
import { EnvMissingError } from "../errors/envErrors";

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
      const hashedPassword = await hashPassword(password);

      const createdUser = await userRepository.createUser({
        username,
        password: hashedPassword,
      });
      user = {
        ...createdUser,
      };
    } catch (err) {
      if (err instanceof EnvMissingError) throw err;
      if (err instanceof UserAlreadyExistsError) throw err;

      throw err;
    }

    return user as UserDTO;
  },
};
