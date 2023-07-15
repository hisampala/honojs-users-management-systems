import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { AuthRoute, UserRoute } from "./router";
const app = new Hono();
app.use("*", logger());
app.route("/users", UserRoute);
app.route("/auth", AuthRoute);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
  app.showRoutes();
});
