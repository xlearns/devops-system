type TInterceptOfKey = Record<string, any>;

export function interceptOfKey(
  source: TInterceptOfKey,
  rule: string[],
): void | { code: number; message: string } {
  const attrKeys = new Set(Object.keys(source));
  const missingKeys = rule.filter((key) => !attrKeys.has(key));

  if (missingKeys.length === 0) {
    return;
  }

  const message = `${missingKeys.join(', ')} cannot be empty!`;

  return {
    code: 400,
    message,
  };
}
