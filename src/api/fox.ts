import { clientInstance } from "@/libs/http-clients";
import { FoxResponse, ApiResponse } from "@/types/fox";

export const getFox = async () => {
  return await clientInstance
    .get<ApiResponse<FoxResponse>>("foxes")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const updateFoxFeed = async () => {
  return await clientInstance
    .patch<ApiResponse<FoxResponse>>("foxes/feed")
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
