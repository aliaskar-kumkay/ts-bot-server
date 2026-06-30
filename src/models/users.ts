export interface BotUser {
  telegramUserId: number;
  chatId: number;
  telegramUsername: string;
  tomorrowUsername: string;
  createdAt: string;
}
export interface LookupUser {
  tomorrowUsername: string;
  telegramUsername: string;
  createdAt: string;
}