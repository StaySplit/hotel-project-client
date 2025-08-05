import axios from 'axios';
import handleApiReqeust from '../handleApiReqeust';
import type { PhotoResponse } from '@/types/photo';

const photo = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const registerPhoto = async (searchQuery: string, file: File) => {
  console.log(file);
  const response = await handleApiReqeust<PhotoResponse>(() =>
    photo.post(`/api/photos?${searchQuery}`, { file }),
  );

  return response;
};
