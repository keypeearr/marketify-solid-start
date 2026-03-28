import * as z from "zod";

const usernameSchema = z
  .string()
  .min(1, "Username is too short")
  .max(20, "Username is too long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long");

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
