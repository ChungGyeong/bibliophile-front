import { clientInstance } from "../libs/http-clients.ts";

export const fetchUsers = async () => {
  const response = await clientInstance.get("");
  return response.data;
};
