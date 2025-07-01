import { client } from './index';
import type { ISignUpRequest } from '@/interface/customer/sign-up-request.interface';
import type { ISignUpResponse } from '@/interface/customer/sign-up-response.interface';
import type { IResponse } from '@/interface';

/**
 * 호텔을 예약하는 Customer의 회원가입입니다.
 * @param data 
 * @returns 
 */
export const signUp = async (data: ISignUpRequest): Promise<IResponse<ISignUpResponse>> => {
  const response = await client.post<IResponse<ISignUpResponse>>('/customers/sign-up', data);
  return response.data;
};