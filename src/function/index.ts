import { Context } from "hono";
import { env } from "hono/adapter";
import { getCookie } from "hono/cookie";
import { verify } from "jsonwebtoken";

export function Me(c: Context) {
  const jwt = getCookie(c, "token");
  console.log(jwt);
  if (jwt?.length) {
    const result = verify(jwt, GetSecretKey(c));
    delete result["iat"];
    return result;
  } else {
    console.log(`invalid jwt`);
  }
}
export function GetSecretKey(c: Context) {
  return env(c)["SECRET"];
}
