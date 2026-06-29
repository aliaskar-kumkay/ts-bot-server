import { sendTelegramMessage } from "../services/telegram";

export async function handleStart(
  botToken: string,
  chatId: number
): Promise<void> {
  await sendTelegramMessage(
    botToken,
    chatId,
    "Send one or more nicknames to find Telegram usernames.\n\nExample:\n#aandeshe #aaristan"
  );
}