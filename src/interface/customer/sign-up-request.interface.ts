export interface ISignUpRequest {
  email: string;
  password: string;
  name: string;
  birthdate: string;  // ISO 형식: YYYY-MM-DD
  nickname: string;
}