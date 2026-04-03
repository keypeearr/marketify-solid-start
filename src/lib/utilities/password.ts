import bcrypt from "bcrypt";
import { EnvMissingError } from "../errors/envErrors";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = process.env.PASSWORD_SALT;
  if (!saltRounds) {
    throw new EnvMissingError("PASSWORD_SALT is invalid");
  }

  const salt = await bcrypt.genSalt(Number(saltRounds));
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
