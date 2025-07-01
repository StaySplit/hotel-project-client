export interface IResponse<T> {
  resultCode: 'SUCCESS' | 'FAIL' | string;
  result: T;
}