import { selector } from "recoil";
import getUserInfo from "@/utils/userAxios";

export const userSelector = selector({
  key: "userSelector",
  get: async () => {
    try {
      const response = await getUserInfo.get("/users/1");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
