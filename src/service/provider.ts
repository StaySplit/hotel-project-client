import { client } from "./index";

export const signUpProvider = async (email: string, password: string) => {
  const response = await client.post("/api/providers/sign-up", {
    email,
    password,
  });

  return response.data;
};