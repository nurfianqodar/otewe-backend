import { Hono } from "hono";
import userApp from "./user/app";
import { HTTPException } from "hono/http-exception";
import authApp from "./auth/app";

const app = new Hono();

app.route("/users", userApp);
app.route("/auth", authApp);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      success: false,
      errors: err.message,
    });
  } else {
    console.error(err);
    c.status(500);
    return c.json({
      success: false,
      errors: "internal server error",
    });
  }
});

export default app;
