export async function findTelegramUsername(
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