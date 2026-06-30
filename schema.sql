CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  telegram_username TEXT
);

CREATE TABLE IF NOT EXISTS bot_users (
  chat_id INTEGER PRIMARY KEY,
  telegram_username TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE registration_tokens (
  token TEXT PRIMARY KEY,
  telegram_username TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  used_at TEXT
);