/**
 * 숫자를 쉼표가 포함된 문자열로 변환합니다.
 * 예: 1000 → "1,000", 12345678 → "12,345,678"
 *
 * @param num 변환할 숫자
 * @returns 쉼표가 포함된 문자열
 */
const formatNumberWithComma = (num: number): string => {
  return num.toLocaleString();
};

export default formatNumberWithComma;