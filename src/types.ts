export type Env = {
  BOT_TOKEN: string;
  DB: D1Database;
};

export type TelegramUpdate = {
  message?: {
    chat?: {
      id?: number;
    };
    from?: {
      id?: number;
      username?: string;
      first_name?: string;
      last_name?: string;
    };
    text?: string;
  };
};