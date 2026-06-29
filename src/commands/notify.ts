import { findTelegramUsername } from "../repositories/auditorRepository";
import { findChatIdByTelegramUsername } from "../repositories/botUserRepository";
import { parseUsernames } from "../services/parser";
import { sendTelegramMessage } from "../services/telegram";
import { getCommandArgs } from "../services/parser";

const MAX_NOTIFY = 20;

export async function handleNotify(
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
      "Send one or more nicknames to notify users about audit.\nExample:\n/notify\n#aandeshe #aaristan"
    );
    return;
  }
  if (usernames.length > MAX_NOTIFY) {
    await sendTelegramMessage(
      botToken,
      chatId,
      `Please send less that ${MAX_NOTIFY} nicknames at once.`
    );
    return;
  }
  const lines: string[] = [];

  for (const username of usernames) {
    const telegramUsername = await findTelegramUsername(db, username);

    if (!telegramUsername) {
      lines.push(`#${username} — не найден`);
      continue;
    }

    const targetChatId = await findChatIdByTelegramUsername(
      db,
      telegramUsername
    );

    if (!targetChatId) {
      lines.push(
        `#${username} — ${telegramUsername}, but they have not started the bot`
      );
      continue;
    }

    await sendTelegramMessage(
      botToken,
      targetChatId,
      `🔔 Someone is looking for you about audit.\n\nNickname: #${username}`
    );

    lines.push(`#${username} — notification sent to ${telegramUsername}`);
  }

  await sendTelegramMessage(botToken, chatId, lines.join("\n"));
}