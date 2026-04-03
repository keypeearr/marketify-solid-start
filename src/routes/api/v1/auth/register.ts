import { APIEvent } from "@solidjs/start/server";
import {
  UserAlreadyExistsError,
  UserValidationError,
} from "~/lib/errors/userErrors";
import { UserDTO } from "~/lib/schemas/schemas";
import { authService } from "~/lib/services/authService";

export async function POST(e: APIEvent) {
  const body = await e.request.json();
  if (!body) {
    return new Response(JSON.stringify({ message: "invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { username, password, confirmPassword } = body;
  let user: UserDTO;
  try {
    user = await authService.register(username, password, confirmPassword);
  } catch (err) {
    if (err instanceof UserValidationError) {
      return new Response(JSON.stringify({ message: err.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (err instanceof UserAlreadyExistsError) {
      return new Response(JSON.stringify({ message: err.message }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      message: `you have successfully registered your account with the username <b>${user.username}</b>`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
