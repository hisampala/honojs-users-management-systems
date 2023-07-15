import { Context } from "hono";
import { jwt } from "hono/jwt";
import { GetSecretKey } from "../function";

export const AuthGuard = (c: Context, next) => {
  const auth = jwt({
    secret: GetSecretKey(c),
    cookie: "token",
  });
  return auth(c, next);
};
