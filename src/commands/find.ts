import { findTelegramUsername } from "../repositories/auditorRepository";
import { parseUsernames } from "../services/parser";
import { sendTelegramMessage } from "../services/telegram";
import { getCommandArgs } from "../services/parser";

const MAX_LOOKUPS = 20;

export async function handleFind(
  db: D1Database,
  botToken: string,
  chatId: number,
  text: string
): Promise<void> {
  const input = getCommandArgs(text);
  const usernames = parseUsernames(input);

  if (usernames.length === 0) {
    await sendTelegramMessage(
      botToken,
      chatId,
      "Send one or more nicknames.\nExample:\n#aandeshe #aaristan"
    );
    return;
  }
  if (usernames.length > MAX_LOOKUPS) {
    await sendTelegramMessage(
      botToken,
      chatId,
      `Please send less that ${MAX_LOOKUPS} nicknames at once.`
    );
    return;
  }

  const lines: string[] = [];

  for (const username of usernames) {
    const telegramUsername = await findTelegramUsername(db, username);

    if (telegramUsername) {
      lines.push(`#${username} — ${telegramUsername}`);
    } else {
      lines.push(`#${username} — не найден`);
    }
  }
  await sendTelegramMessage(botToken, chatId, lines.join("\n"));
}