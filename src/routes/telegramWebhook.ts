import type { Context } from "hono";
import type { Env, TelegramUpdate } from "../types";
import { saveBotUser } from "../repositories/botUserRepository";
import { parseCommand } from "../services/parser";
import { sendTelegramMessage } from "../services/telegram";
import { handleFind } from "../commands/find";
import { handleNotify } from "../commands/notify";
import { handleHelp } from "../commands/help";
import { handleStart } from "../commands/start";
import { handleUnknown } from "../commands/unknown";

type AppContext = Context<{ Bindings: Env }>;

export async function handleTelegramWebhook(c: AppContext) {
  const update = await c.req.json<TelegramUpdate>();

  await saveBotUser(c.env.DB, update);
  const chatId = update.message?.chat?.id;
  const text = update.message?.text?.trim();

  if (!chatId || !text) {
    return c.text("No message text");
  }

  const command = parseCommand(text);
  switch (command) {
    case "/start":
      await handleStart(c.env.BOT_TOKEN, chatId);
      return c.text("OK");

    case "/help":
      await handleHelp(c.env.BOT_TOKEN, chatId);
      return c.text("OK");
    case "/find":
      await handleFind(c.env.DB, c.env.BOT_TOKEN, chatId, text);
      return c.text("OK");

    case "/notify":
      await handleNotify(c.env.BOT_TOKEN, chatId);
      return c.text("OK");

    case null:
      await handleFind(c.env.DB, c.env.BOT_TOKEN, chatId, text);
      return c.text("OK");

    default:
      await handleUnknown(c.env.BOT_TOKEN, chatId)
      return c.text("OK");
  }
}