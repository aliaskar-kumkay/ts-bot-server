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



export async function findChatIdByTelegramUsername(
  db: D1Database,
  telegramUsername: string
): Promise<number | null> {
  const cleanTelegramUsername = telegramUsername.trim().replace(/^@/, "");

  const row = await db
    .prepare(`
      SELECT chat_id
      FROM bot_users
      WHERE telegram_username = ?
    `)
    .bind(cleanTelegramUsername)
    .first<{ chat_id: number }>();

  return row?.chat_id ?? null;
}