export function shortAddress(value: string): string {
  return value.replace(/\b(\w{7}).+(\w{4})\b/, '$1...$2');
}
