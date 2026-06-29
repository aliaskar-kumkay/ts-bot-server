import { sendTelegramMessage } from "../services/telegram";

export async function handleNotify(
  botToken: string,
  chatId: number
): Promise<void> {
  await sendTelegramMessage(
    botToken,
    chatId,
    "Notify feature is not ready yet."
  );
}