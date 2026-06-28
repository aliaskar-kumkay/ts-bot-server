import { Hono } from "hono";

type Env = {
  BOT_TOKEN: string;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("Bot server is running");
});

app.get("/health", (c) => {
  return c.text("OK");
});

app.get("/find", async (c) => {
  const username = c.req.query("username")?.trim();

  if (!username) {
    return c.text("Missing username", 400);
  }

  const telegramUsername = await findTelegramUsername(c.env.DB, username);

  if (!telegramUsername) {
    return c.text(`${username} — не найден`);
  }

  return c.text(`${username} — ${telegramUsername}`);
});

app.post("/telegram-webhook", async (c) => {
  const update = await c.req.json<any>();

  const chatId = update.message?.chat?.id;
  const text = update.message?.text?.trim();

  if (!chatId || !text) {
    return c.text("No message text");
  }

const cleanUsername = text.replace(/^#/, "");

const telegramUsername = await findTelegramUsername(c.env.DB, cleanUsername);

const reply = telegramUsername
  ? `${cleanUsername} — ${telegramUsername}`
  : `${cleanUsername} — не найден`;

  await sendTelegramMessage(c.env.BOT_TOKEN, chatId, reply);

  return c.text("OK");
});

async function findTelegramUsername(
  db: D1Database,
  input: string
): Promise<string | null> {
  const username = input.trim().replace(/^#/, "");

  const row = await db
    .prepare("SELECT telegram_username FROM users WHERE username = ?")
    .bind(username)
    .first<{ telegram_username: string | null }>();

  return row?.telegram_username ?? null;
}

async function sendTelegramMessage(
  botToken: string,
  chatId: number,
  text: string
): Promise<void> {
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });
}

export default app;