export function shortAddress(value: string): string {
  return value.replace(/\b(\w{7}).+(\w{4})\b/, '$1...$2');
}

export function parseNum(num) {
  var num = num.toString(),
    result = '';

  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }

  if (num) result = num + result;

  return result;
}
