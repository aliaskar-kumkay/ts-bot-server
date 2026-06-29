export function parseCommand(text: string): string | null {
  const firstWord = text.trim().split(/\s+/)[0];

  if (!firstWord.startsWith("/")) {
    return null;
  }

  return firstWord.split("@")[0].toLowerCase();
}

export function getCommandArgs(text: string): string {
  const trimmedText = text.trim();

  const firstWord = trimmedText.split(/\s+/)[0];

  if (!firstWord.startsWith("/")) {
    return trimmedText;
  }

  return trimmedText.split(/\s+/).slice(1).join(" ").trim();
}

export function parseUsernames(input: string): string[] {
  return input
    .split(/\s+/)
    .map((username) => username.trim())
    .filter((username) => username.length > 0)
    .map((username) => username.replace(/^#/, ""));
}