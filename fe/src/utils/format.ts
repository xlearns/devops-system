export function trim(str: string) {
  return str.trim();
}

export function formatTime(time: string | undefined) {
  if (!time) return;
  return new Date(time).toLocaleString();
}

export function omit(obj: Record<string, any>, fields: string | string[]) {
  const result = {} as Record<string, any>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !fields.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
