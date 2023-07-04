export function trim(str: string) {
  return str.trim();
}

export function formatTime(time: string | undefined) {
  if (!time) return;
  return new Date(time).toLocaleString();
}
