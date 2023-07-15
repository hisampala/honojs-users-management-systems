import { Hono } from "hono";
import { getCookie } from "hono/cookie";

import { UsersController } from "../controllers";
import { ResponseItem, ResponseList } from "../models/respones.model";
import { Users } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { ZCreateUsers, ZUpdateUsers } from "../validate";
import { AuthGuard } from "../middleware";
import { Me } from "../function";
export const UserRoute = new Hono();
UserRoute.get("/", AuthGuard, async (c) => {
  const limit = Number.parseInt(c.req.query("limit") || "10");
  const page = Number.parseInt(c.req.query("page") || "0");
  const results = await await UsersController.GetAll(limit, page);
  return c.json(new ResponseList<Users>(results, page, limit), {
    status: 200,
    statusText: "ok",
  });
});

UserRoute.get("/me", AuthGuard, (c) => {
  const me = Me(c);
  return c.json(me, {
    status: 200,
    statusText: "ok",
  });
});
UserRoute.get("/:id", AuthGuard, async (c) => {
  const id = c.req.param("id");
  const result = await await UsersController.GetById(id);
  return c.json(new ResponseItem<Users>(result), {
    status: 200,
    statusText: "ok",
  });
});
UserRoute.post("/create", zValidator("json", ZCreateUsers), async (c) => {
  const data = await c.req.json();
  const result = await UsersController.Create(data);
  return c.json(new ResponseItem<Users>(result), {
    status: 200,
    statusText: "ok",
  });
});
UserRoute.put(
  "/update/:id",
  AuthGuard,
  zValidator("json", ZUpdateUsers),
  async (c) => {
    const data = await c.req.json();
    const id = await c.req.param("id");
    const result = await UsersController.Update(id, data);
    return c.json(new ResponseItem<Users>(result), {
      status: 200,
      statusText: "ok",
    });
  }
);
UserRoute.delete("/delete/:id", AuthGuard, async (c) => {
  const id = await c.req.param("id");
  const result = await UsersController.Delete(id);
  return c.json(new ResponseItem<Users>(result), {
    status: 200,
    statusText: "ok",
  });
});
