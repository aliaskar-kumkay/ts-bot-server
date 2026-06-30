export interface RegistrationToken {
  token: string;
  telegramUserId: number;
  chatId: number;
  telegramUsername: string;
  createdAt: string;
  usedAt: string | null;
}