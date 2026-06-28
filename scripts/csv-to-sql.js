const fs = require("fs");

const csvPath = "users.csv";
const sqlPath = "seed.sql";

const content = fs.readFileSync(csvPath, "utf8");

const lines = content
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

function escapeSql(value) {
  return value.replaceAll("'", "''");
}

const statements = lines.map((line) => {
  const [rawUsername, rawTelegramUsername = ""] = line.split(",");

  const username = rawUsername.trim().replace(/^#/, "");
  const telegramUsername = rawTelegramUsername.trim();

  if (!telegramUsername) {
    return `INSERT OR REPLACE INTO users (username, telegram_username) VALUES ('${escapeSql(username)}', NULL);`;
  }

  return `INSERT OR REPLACE INTO users (username, telegram_username) VALUES ('${escapeSql(username)}', '${escapeSql(telegramUsername)}');`;
});

fs.writeFileSync(sqlPath, statements.join("\n"));

console.log(`Created ${sqlPath} with ${statements.length} rows`);