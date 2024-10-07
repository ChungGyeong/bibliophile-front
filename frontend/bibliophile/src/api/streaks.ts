import { clientInstance } from "@/libs/http-clients.ts";

export const getStreaks = async (year: number, month: number) => {
  return await clientInstance.get(`/streaks`, {
      params: {
        year,
        month,
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}