export class EnvMissingError extends Error {
  constructor(message: string = "env variable is missing") {
    super(message);
  }
}
