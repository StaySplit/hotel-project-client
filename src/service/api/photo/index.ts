import handleApiReqeust from '../handleApiReqeust';
import type { PhotoResponse } from '@/types/photo';
import client from '@/service/instance/client';

export const registerPhoto = async (searchQuery: string, file: File) => {
  console.log(file);
  const response = await handleApiReqeust<PhotoResponse>(() =>
    client.post(
      `/api/photos?${searchQuery}`,
      { file },
      { headers: { 'Content-Type': 'multipart/form-data' } },
    ),
  );

  return response;
};

export const registerPhotos = async (searchQuery: string, files: File[]) => {
  console.log(files);
  const response = await handleApiReqeust<PhotoResponse>(() =>
    client.post(
      `/api/photos/list?${searchQuery}`,
      { files },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    ),
  );

  return response;
};
