export async function saveToken(
    db: D1Database,
    token: string,
    username: string
): Promise<void> {

    await db
        .prepare(`
      INSERT OR REPLACE INTO registration_tokens
      (token, telegram_username)
      VALUES (?, ?)
    `)
        .bind(token, username)
        .run();
}
export async function getUsernameByToken(
    db: D1Database,
    token: string
): Promise<string | null> {
    const row = await db
        .prepare(`
      SELECT telegram_username
      FROM registration_tokens
      WHERE token = ?
    `)
        .bind(token)
        .first<{ telegram_username: string }>();

    return row?.telegram_username ?? null;
}