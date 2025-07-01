import { client } from './index';

export const login = async (
  data: {
    email: string;
    password: string;
  }
): Promise<{
  resultCode: string;
  result: string;
}> => {
  const response = await client.post('/api/users/login', data);
  return response.data;
};