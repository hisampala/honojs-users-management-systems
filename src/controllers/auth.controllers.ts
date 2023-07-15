import { HTTPException } from "hono/http-exception";
import { UserRepository } from "../repositorys";
import { verifySync } from "@node-rs/argon2";
const AuthException = new HTTPException(400, {
  message: "email or password incorrect",
});
async function SignIn(email: string, password: string) {
  const user = await UserRepository.GetOne({
    email: email,
  });
  if (!user) throw AuthException;
  const validPassword = verifySync(user.password, password);
  if (!validPassword) {
    throw AuthException;
  }
  delete user.password;
  return user;
}
export const AuthController = { SignIn };
