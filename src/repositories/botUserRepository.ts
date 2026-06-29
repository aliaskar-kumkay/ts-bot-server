import type { TelegramUpdate } from "../types";

export async function saveBotUser(
  db: D1Database,
  update: TelegramUpdate
): Promise<void> {
  const from = update.message?.from;
  const chat = update.message?.chat;

  if (!from || !chat?.id) {
    return;
  }

  await db
    .prepare(`
      INSERT OR REPLACE INTO bot_users
      (chat_id, telegram_username)
      VALUES (?, ?)
    `)
    .bind(chat.id, from.username ?? null)
    .run();
}