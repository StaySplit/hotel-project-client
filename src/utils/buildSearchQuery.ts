/**
 * key, value 형태의 객체 데이터를 queryString으로 변환 후 반환하는 유틸 함수
 *
 *
 * @param Record

 *
 * @returns string
 */

const buildSearchQuery = (param: Record<string, string | string[]>) => {
  const sp = new URLSearchParams();
  Object.entries(param).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== '') sp.append(key, v);
      });
    } else {
      if (value !== '') sp.append(key, value);
    }
  });

  return sp.toString();
};

export default buildSearchQuery;
