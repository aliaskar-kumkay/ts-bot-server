import { sendTelegramMessage } from "../services/telegram";

export async function handleUnknown(
    botToken: string,
    chatId: number
): Promise<void> {
    await sendTelegramMessage(
        botToken,
        chatId,
        "Unknown command. Use /help to see available commands."
    );
}