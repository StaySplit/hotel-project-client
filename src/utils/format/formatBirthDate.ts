export function formatBirthDate(value: string): string {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length <= 4) return onlyNums;
  if (onlyNums.length <= 6) return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`;
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6, 8)}`;
}
