import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { sign } from "jsonwebtoken";
export const AuthRoute = new Hono();
import { env } from "hono/adapter";
import { AuthController } from "../controllers/auth.controllers";
import { GetSecretKey } from "../function";
import { AuthGuard } from "../middleware";
AuthRoute.post("signin", async (c) => {
  const { email, password } = await c.req.json();
  const result = await AuthController.SignIn(email, password);
  const jwt = sign(result, GetSecretKey(c));
  if (jwt.length) {
    setCookie(c, "token", jwt, {
      path: "/",
      domain: "localhost",
    });
  } else {
    return c.text("signin fail ", {
      status: 200,
      statusText: "ok",
    });
  }
  return c.text("You are authorized", {
    status: 200,
    statusText: "ok",
  });
});
AuthRoute.get("signout", AuthGuard, async (c) => {
  deleteCookie(c, "token", {
    path: "/",
    domain: "localhost",
  });
  return c.text("You are signout", {
    status: 200,
    statusText: "ok",
  });
});
