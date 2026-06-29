import { sendTelegramMessage } from "../services/telegram";
const HELP_MESSAGE = `🤖 How to use this bot

Send one or more platform nicknames, and I will find their Telegram usernames.

Examples:
#aandeshe
#aandeshe #aaristan #aaset

You can also send nicknames on separate lines:
#aandeshe
#aaristan
#aaset

Commands:

/find — find Telegram usernames by platform nicknames

Examples:
/find #aandeshe
/find #aandeshe #aaristan #aaset

/notify — notify an auditor if they have already started this bot

Example:
/notify #aandeshe

/start — start the bot and register your chat

/help — show this help message

Limit: up to 20 nicknames per message.`;

export async function handleHelp(
  botToken: string,
  chatId: number
): Promise<void> {
  await sendTelegramMessage(
    botToken,
    chatId,
    HELP_MESSAGE
  );
}