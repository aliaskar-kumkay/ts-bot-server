import { Hono } from "hono";
import type { Env } from "./types";
import { handleTelegramWebhook } from "./routes/telegramWebhook";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("Bot server is running");
});

app.get("/health", (c) => {
  return c.text("OK");
});

app.post("/telegram-webhook", handleTelegramWebhook);

export default app;