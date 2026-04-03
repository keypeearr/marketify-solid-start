import { $ZodIssue } from "zod/v4/core";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists");
  }
}

export class UserValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
